import { useState, useContext } from "react";

import { UserContext } from "../contexts/UserContext";
import styles from "./DeleteMaterialModal.module.css";
import api from "../../services/api";
import StatusMessage from "../StatusMessage";
import { Button } from "react-bootstrap";

import { FloatingLabel, Form } from "react-bootstrap";

export default function DeleteMaterialModal({
  show,
  onClose,
  materialId,
  materialName,
  materialQuantity,
}) {
  var dateObject = new Date();
  /* const formatedDate =
    dateObject.getDate() < 10
      ? `0${dateObject.getDate()}`
      : dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const formatedMonth = month < 10 ? `0${month}` : month;
  const date = `${dateObject.getFullYear()}-${formatedMonth}-${formatedDate}`; */

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [variant, setVariant] = useState("");
  const [visible, setVisible] = useState(false);
  const [remark, setRemark] = useState("");

  const { user } = useContext(UserContext);

  if (!show) return null;

  const deleteMaterial = () => {
    console.log("tentando deletar...");
    const mili = dateObject.getTime();
    api
      .delete(`/materials/${materialId}`)
      .then((response) => console.log(response.status))
      .then(() => {
        const description = `Material removido do almoxarifado -> ${materialQuantity}x ${materialName}.`;

        api
          .post("/movements", {
            user_id: user.id,
            user_name: user.name,
            operation: "Exclusão",
            date: dateObject.toLocaleDateString('pt-BR'),
            mili,
            description,
            remark,
          })
          .then((response) => {
            console.log(response.status);
            setStatus("Sucesso");
            setMessage("O material foi apagado da lista.");
            setVariant("success");
            setVisible(true);
          })
          .catch((err) => {
            setStatus("Falha");
            setMessage(
              "Não foi possível registrar a operação no histórico de movimentações."
            );
            setVariant("dark");
            setVisible(true);
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
        setStatus("Falha");
        setMessage(
          "Não foi possível apagar o material da lista. Tente novamente."
        );
        setVariant("dark");
        setVisible(true);
      });
    setVisible(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <StatusMessage
            show={visible}
            variant={variant}
            message={message}
            status={status}
          />
          <h4 className={styles.modal_title}>Deletar Material</h4>
        </div>
        <div className={styles.modal_body}>
          <p>
            Deseja excluir definitivamente da lista o material: {materialName}?
          </p>
          <FloatingLabel
            label="Observações"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className={styles.NameFloatingLabel}
          >
            <Form.Control type="text-area" />
          </FloatingLabel>
        </div>
        <div className={styles.modal_footer}>
          <Button
            id="cancel"
            variant="secondary"
            onClick={onClose}
            className={styles.button}
          >
            Cancelar
          </Button>
          <Button id="confirm" variant="danger" onClick={deleteMaterial}>
            Excluir material
          </Button>
        </div>
      </div>
    </div>
  );
}
