import CustomModal from "../Modal/Modal";
import css from "./Contact.module.css";
import { UseModal } from "../../hooks/UseModal";
import { useContact } from "../../hooks/useContact";
import { addContactValidationSchema } from "../../js/validation-schemas";
import { activateErrorToastWithCustomMessage } from "../../js/toast";
import ContactBody from "./ContactBody";
import ContactButton from "./ContactButton";

export default function Contact({ contactData: initialContactData }) {
  // =========================== USE MODAL HOOK

  const { modalIsOpen, openModal, closeModal } = UseModal();

  // =========================== USE CONTACT HOOK

  const {
    contactData,
    cardState,
    setCardState,
    editData,
    handleTextClick,
    buildButtonText,
    buildModalAction,
    clickedInput
  } = useContact(initialContactData);

  // ============================== CARD BUTTON CLICK

  const handleCardButtonClick = () => {
    if (cardState !== "editing-state") {
      setCardState("deleting-state");
      openModal();
      return;
    }

    if (cardState === "editing-state") {
      addContactValidationSchema
        .validate(contactData)
        .then(() => {
          openModal();
        })
        .catch(() => {
          activateErrorToastWithCustomMessage(
            "Make sure your contact has between 3 and 50 characters and number has minimum 8 characters"
          );
        });
    }
  };

  // =================================== RENDERING

  const isEditing = cardState === "editing-state";

  return (
    <>
      <li className={css["contact-item"]}>
        <ContactBody
          isEditing={isEditing}
          contactData={contactData}
          editData={editData}
          handleTextClick={handleTextClick}
          clickedInput={clickedInput}
        />
        <ContactButton
          className={css["delete-button"]}
          handleClick={handleCardButtonClick}
          buttonText={buildButtonText()}
        >
        </ContactButton>
      </li>
      <CustomModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        cardState={cardState}
        doSomething={buildModalAction()}
      />
    </>
  );
}

