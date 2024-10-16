import { Layout } from "antd";
import { Row, Container } from "reactstrap";
const { Footer } = Layout;



const AppFooter = () => {
  return <Footer style={FOOTER_STYLE}>{COPYRIGHT_TEXT}</Footer>;
};

export default AppFooter;