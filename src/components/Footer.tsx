const Footer = () => {
  const year = new Date().getFullYear();

  const content = (
    <footer className="footer">
      <p>Tout droit réservé &copy; {year}</p>
    </footer>
  );
  return content;
};

export default Footer;
