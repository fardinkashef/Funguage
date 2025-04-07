import "./GreetingSection.scss";
function GreetingSection({ username }: { username: string }) {
  return (
    <div className="GreetingSection">
      It&apos;s great to have you here <span>{username}</span>
    </div>
  );
}

export default GreetingSection;
