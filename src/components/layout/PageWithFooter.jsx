import Footer from "./Footer";

export default function PageWithFooter({ config, children }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="flex-1">{children}</div>
      <Footer config={config} />
    </div>
  );
}
