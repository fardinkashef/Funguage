import { useAuthContext } from "../../shared/context/AuthContext";
import "./GreetingSection.scss";
function GreetingSection() {
  const { userName } = useAuthContext();
  return (
    <div className="GreetingSection">
      It's great to have you here <span>{userName}</span>
    </div>
  );
}

export default GreetingSection;
