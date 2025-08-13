export default function Maintenance() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-3xl font-bold mb-4">
        🚧 Treasure is making some changes 🚧
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        The Apollo Chatbot is currently being updated. Please check back soon!
        But you can still a see a sneak peek of the demo below. Thank you!!
      </p>

      <div className="flex gap-4">
        <a
          href="https://x.com/Oluwatobicodes/status/1944008258446123214"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          View on X
        </a>
        <a
          href="https://www.linkedin.com/posts/treasure-odetokun-107a21231_software-ai-frontend-activity-7349985092519243777-6EYq?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADn-cVcB6nwC6gH20RyRSfVB-z43z7PH-bc"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
        >
          View on LinkedIn
        </a>
      </div>
    </div>
  );
}
