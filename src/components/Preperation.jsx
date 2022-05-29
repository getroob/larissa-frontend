import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import DetailsList from "./DetailsList";

const Preperation = () => {
  const user = useSelector((state) => state.user);
  const lang = useSelector((state) => state.lang);

  useEffect(() => {
    if (!user) window.location.href = "/login";
  }, [user]);

  return (
    <div className="m-5">
      <h2>{lang === 'gr' ? 'Πληροφοριες σχετικα με την διαδικασια' : 'Information about the process'}</h2>
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
            {lang === 'gr' ? 'Γενικες οδηγιες' : 'General Instructions'}
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a
            href={`${process.env.PUBLIC_URL}/assets/Παραδειγμα πιστοποιητικου γεννησης.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            {lang === 'gr' ? 'Παραδειγμα πιστοποιητικου γεννησης' : 'Birth certificate example'}
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a
            href={`${process.env.PUBLIC_URL}/assets/Οδηγιες δηλωσης γεννησεων.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            {lang === 'gr' ? 'Οδηγιες δηλωσεις γεννησεων' : 'Instructions for birth declarations'}
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a
            href={`${process.env.PUBLIC_URL}/assets/Οδηγιες ονοματοδοσιας.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            {lang === 'gr' ? 'Οδηγιες ονοματοδοσιας' : 'Naming instructions'}
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a
            href={`${process.env.PUBLIC_URL}/assets/Παραδειγμα αιτησης ονοματοδοσιας.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            {lang === 'gr' ? 'Παραδειγμα αιτησης ονοματοδοσιας' : 'Example of a naming application'}
          </a>
        </ListGroup.Item>
      </ListGroup>
      <h3 className="mt-5">{lang === 'gr' ? 'Προετοιμασια αιτησης ονοματοδοσιας' : 'Naming application preparation'}</h3>
      <DetailsList type="preperation" />
    </div>
  );
};

export default Preperation;
