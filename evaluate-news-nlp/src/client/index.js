import { checkForName } from "./js/nameChecker";
import { handleSubmit } from "./js/formHandler";
import "./styles/header.scss";
import "./styles/base.scss";
import "./styles/form.scss";
import "./styles/footer.scss";
import "./styles/resets.scss";
const submit = document.querySelector(".submit");
submit.addEventListener("click", (e) => {
  handleSubmit(e);
});
export { handleSubmit };
