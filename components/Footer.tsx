export default function FooterComponent() {
  return (
    <footer className="footer footer-horizontal footer-center text-base-300 hidden p-4 lg:grid">
      <aside>
        <p>
          © {new Date().getFullYear()} iLAB (Innovation Laboratory). All rights
          reserved.
        </p>
      </aside>
    </footer>
  );
}
