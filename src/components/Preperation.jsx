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
    <div className='m-5'>
      <h2>
        {lang === 'gr'
          ? 'Πληροφοριες σχετικα με την διαδικασια'
          : lang === 'fr'
          ? 'Informations sur le processus'
          : 'Information about the process'}
      </h2>
      <ListGroup>
        <ListGroup.Item>
          <a
            href={`${process.env.PUBLIC_URL}/assets/${
              lang === 'gr'
                ? 'ΔΗΛΩΣΗ ΓΕΝΝΗΣΗΣ.pdf'
                : lang === 'fr'
                ? 'DECLARATION DE NAISSANCE fr.pdf'
                : 'BIRTH REGISTRATION ACT.pdf'
            }`}
            target='_blank'
            rel='noreferrer'
          >
            {lang === 'gr' ? 'ΔΗΛΩΣΗ ΓΕΝΝΗΣΗΣ' : lang === 'fr' ? 'DECLARATION DE NAISSANCE' : 'BIRTH REGISTRATION ACT'}
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a
            href={`${process.env.PUBLIC_URL}/assets/${
              lang === 'gr'
                ? 'ΑΙΤΗΣΗ ΟΝΟΜΑΤΟΔΟΣΙΑΣ.pdf'
                : lang === 'fr'
                ? 'DECLARATION DE PRENOM fr.pdf'
                : 'NAME DECLARATION APPLICATION.pdf'
            }`}
            target='_blank'
            rel='noreferrer'
          >
            {lang === 'gr'
              ? 'ΑΙΤΗΣΗ ΟΝΟΜΑΤΟΔΟΣΙΑΣ'
              : lang === 'fr'
              ? 'DECLARATION DE PRENOM'
              : 'NAME DECLARATION APPLICATION'}
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a
            href={`${process.env.PUBLIC_URL}/assets/${
              lang === 'gr'
                ? 'ΔΗΛΩΣΗ ΟΝΟΜΑΤΟΣ.pdf'
                : lang === 'fr'
                ? 'DEMANDE D ATTRIBUTION DE PRENOM fr.pdf'
                : 'NAME DECLARATION.pdf'
            }`}
            target='_blank'
            rel='noreferrer'
          >
            {lang === 'gr' ? 'ΔΗΛΩΣΗ ΟΝΟΜΑΤΟΣ' : lang === 'fr' ? 'DEMANDE D ATTRIBUTION DE PRENO' : 'NAME DECLARATION'}
          </a>
        </ListGroup.Item>
      </ListGroup>
      <h3 className='mt-5'>
        {lang === 'gr'
          ? 'Προετοιμασια αιτησης ονοματοδοσιας'
          : lang === 'fr' 
          ? 'Préparation de la demande de nommage'
          : 'Naming application preparation'}
      </h3>
      <DetailsList type='preperation' />
    </div>
  )
};

export default Preperation;
