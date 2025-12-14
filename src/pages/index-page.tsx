import CreatePostButton from "@/components/post/create-post-button";

export default function IndexPage() {
  return (
    <div className="">
      <CreatePostButton />
      <div className="h-screen">second screen</div>
      <div className="h-screen">third screen</div>
    </div>
  );
}
