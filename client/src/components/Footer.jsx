function Footer() {
  return (
    <footer className="footer">
      <p>NetFlex — Movie data provided by TMDB.</p>
      <p>&copy; {new Date().getFullYear()} NetFlex. Not a real streaming service.</p>
    </footer>
  );
}

export default Footer;
