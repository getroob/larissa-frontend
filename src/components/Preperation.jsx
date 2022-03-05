import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import RefugeeForm from "./RefugeeForm";

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
          <a
            href="https://drive.google.com/drive/folders/1cRXcuc4egCjEomT0OoPzSM92i1ld8QpT"
            target="_blank"
            rel="noreferrer"
          >
            Γενικες οδηγιες
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a
            href="https://drive.google.com/drive/folders/1cRXcuc4egCjEomT0OoPzSM92i1ld8QpT"
            target="_blank"
            rel="noreferrer"
          >
            Παραδειγμα πιστοποιητικου γεννησης
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a
            href="https://drive.google.com/drive/folders/1cRXcuc4egCjEomT0OoPzSM92i1ld8QpT"
            target="_blank"
            rel="noreferrer"
          >
            Οδηγιες δηλωσεις γεννησεων
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a
            href="https://drive.google.com/drive/folders/1cRXcuc4egCjEomT0OoPzSM92i1ld8QpT"
            target="_blank"
            rel="noreferrer"
          >
            Οδηγιες ονοματοδοσιας
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a
            href="https://drive.google.com/drive/folders/1cRXcuc4egCjEomT0OoPzSM92i1ld8QpT"
            target="_blank"
            rel="noreferrer"
          >
            Παραδειγμα αιτησεις ονοματοδοσιας
          </a>
        </ListGroup.Item>
      </ListGroup>
      <h3 className="mt-5">Προετοιμασια δικαιολογητικων και αλλων στοιχειων</h3>
      <RefugeeForm />
    </div>
  );
};

export default Preperation;
