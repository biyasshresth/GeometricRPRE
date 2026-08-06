import Footer from "@/common/header-footer/Footer";
import NavBar from "@/common/header-footer/NavBar";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col ">
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
