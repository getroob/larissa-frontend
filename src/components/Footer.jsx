import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

const Footer = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{ px: 1, py: 2, display: "flex", justifyContent: "flex-start" }}
    >
      <Link
        href="tel:+30 2413500254"
        target="_blank"
        sx={{ color: "secondary.main", textDecoration: "none" }}
      >
        Contact
      </Link>
    </Container>
  );
};

export default Footer;
