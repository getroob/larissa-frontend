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
          : 'Information about the process'}
      </h2>
      <ListGroup>
        <ListGroup.Item>
          <a
            href={`${process.env.PUBLIC_URL}/assets/${
              lang === 'gr'
                ? 'ΔΗΛΩΣΗ ΓΕΝΝΗΣΗΣ.pdf'
                : 'BIRTH REGISTRATION ACT.pdf'
            }`}
            target='_blank'
            rel='noreferrer'
          >
            {lang === 'gr' ? 'ΔΗΛΩΣΗ ΓΕΝΝΗΣΗΣ' : 'BIRTH REGISTRATION ACT'}
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a
            href={`${process.env.PUBLIC_URL}/assets/${
              lang === 'gr'
                ? 'ΑΙΤΗΣΗ ΟΝΟΜΑΤΟΔΟΣΙΑΣ.pdf'
                : 'NAME DECLARATION APPLICATION.pdf'
            }`}
            target='_blank'
            rel='noreferrer'
          >
            {lang === 'gr'
              ? 'ΑΙΤΗΣΗ ΟΝΟΜΑΤΟΔΟΣΙΑΣ'
              : 'NAME DECLARATION APPLICATION'}
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          <a
            href={`${process.env.PUBLIC_URL}/assets/${
              lang === 'gr'
                ? 'ΔΗΛΩΣΗ ΟΝΟΜΑΤΟΣ.pdf'
                : 'NAME DECLARATION.pdf'
            }`}
            target='_blank'
            rel='noreferrer'
          >
            {lang === 'gr' ? 'ΔΗΛΩΣΗ ΟΝΟΜΑΤΟΣ' : 'NAME DECLARATION'}
          </a>
        </ListGroup.Item>
      </ListGroup>
      <h3 className='mt-5'>
        {lang === 'gr'
          ? 'Προετοιμασια αιτησης ονοματοδοσιας'
          : 'Naming application preparation'}
      </h3>
      <DetailsList type='preperation' />
    </div>
  )
};

export default Preperation;
