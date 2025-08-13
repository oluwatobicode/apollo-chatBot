import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendPromptToOpenAI } from "../../services/openAIService";
import {
  addMessage,
  createConversations,
  getConversation,
  getConversationHistory,
  getMessages,
} from "../../services/supabaseServices";

interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at?: string;
  updated_at?: string;
}

interface Message {
  id: string;
  created_at: string;
  conversation_id: string;
  content?: string;
  role: "user" | "bot";
}

interface ChatState {
  conversations: Conversation[];
  messagesByConversations: {
    [conversationId: string]: Message[];
  };
  activeConversationId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  messagesByConversations: {},
  activeConversationId: null,
  isLoading: false,
  error: null,
};

export const sendMessageToAI = createAsyncThunk(
  "chat/sendMessageToAI",
  async ({
    conversationId,
    prompt,
  }: {
    conversationId: string;
    prompt: string;
  }) => {
    const history = await getConversationHistory(conversationId); // optional
    const botReply = await sendPromptToOpenAI([
      ...history,
      { role: "user", content: prompt },
    ]);

    await addMessage(conversationId, prompt, "user");
    await addMessage(conversationId, botReply, "assistant");

    return { conversationId, prompt, botReply };
  }
);

export const createNewConversation = createAsyncThunk(
  "chat/createNewConversation",
  async (title: string) => {
    const conversationId = await createConversations(title);
    return {
      id: conversationId,
      title,
      user_id: "",
      created_at: new Date().toISOString(),
    };
  }
);

export const loadConversation = createAsyncThunk(
  "chat/loadConversations",
  async () => {
    return await getConversation();
  }
);

export const loadConversationMessages = createAsyncThunk(
  "chat/loadConversationMessages",
  async (conversationId: string) => {
    const messages = await getMessages(conversationId);
    return { conversationId, messages };
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversationId = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Send message
    builder
      .addCase(sendMessageToAI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMessageToAI.fulfilled, (state, action) => {
        state.isLoading = false;
        const { conversationId, prompt, botReply } = action.payload;

        // Add messages to state
        if (!state.messagesByConversations[conversationId]) {
          state.messagesByConversations[conversationId] = [];
        }

        state.messagesByConversations[conversationId].push(
          {
            id: Date.now().toString(),
            conversation_id: conversationId,
            content: prompt,
            role: "user",
            created_at: new Date().toISOString(),
          },
          {
            id: (Date.now() + 1).toString(),
            conversation_id: conversationId,
            content: botReply,
            role: "bot",
            created_at: new Date().toISOString(),
          }
        );
      })
      .addCase(sendMessageToAI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to send message";
      });

    // Create conversation
    builder.addCase(createNewConversation.fulfilled, (state, action) => {
      state.conversations.unshift(action.payload);
      state.activeConversationId = action.payload.id;
    });

    // Load conversations
    builder.addCase(loadConversation.fulfilled, (state, action) => {
      state.conversations = action.payload;
    });

    // Load messages
    builder.addCase(loadConversationMessages.fulfilled, (state, action) => {
      const { conversationId, messages } = action.payload;
      state.messagesByConversations[conversationId] = messages;
    });
  },
});

export const { setActiveConversation, clearError } = chatSlice.actions;
export default chatSlice.reducer;
