export default function FooterComponent() {
  return (
    <footer className="footer sm:footer-horizontal footer-center text-base-300 p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by iLAB
          (Innovation Laboratory)
        </p>
      </aside>
    </footer>
  );
}
