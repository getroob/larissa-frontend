import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import DetailsList from "./DetailsList";

const Preperation = () => {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) window.location.href = "/login";
  }, [user]);

  return (
    <div className="m-5">
      <h2>Πληροφοριες σχετικα με την διαδικασια</h2>
      <ListGroup>
        <ListGroup.Item>
          {/* <a
            href={`${process.env.PUBLIC_URL}/assets/eleftherios-myriounis.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            Read more
          </a> */}
          <a
            href={`${process.env.PUBLIC_URL}/assets/Γενικες οδηγιες.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            Γενικες οδηγιες
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a
            href={`${process.env.PUBLIC_URL}/assets/Παραδειγμα πιστοποιητικου γεννησης.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            Παραδειγμα πιστοποιητικου γεννησης
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a
            href={`${process.env.PUBLIC_URL}/assets/Οδηγιες δηλωσης γεννησεων.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            Οδηγιες δηλωσεις γεννησεων
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a
            href={`${process.env.PUBLIC_URL}/assets/Οδηγιες ονοματοδοσιας.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            Οδηγιες ονοματοδοσιας
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a
            href={`${process.env.PUBLIC_URL}/assets/Παραδειγμα αιτησης ονοματοδοσιας.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            Παραδειγμα αιτησης ονοματοδοσιας
          </a>
        </ListGroup.Item>
      </ListGroup>
      <h3 className="mt-5">Προετοιμασια αιτησης ονοματοδοσιας</h3>
      <DetailsList type="preperation" />
    </div>
  );
};

export default Preperation;
