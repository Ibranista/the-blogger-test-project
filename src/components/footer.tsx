function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50 py-12">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} My Blog. All rights reserved.
        </p>
      </section>
    </footer>
  );
}

export default Footer;
