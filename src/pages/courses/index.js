// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Demo Components
import WizardHorizontal from "./WizardHorizontal";

// ** Custom Components
import BreadCrumbs from "@components/breadcrumbs";

const Wizard = () => {
  return (
    <Fragment>
      <BreadCrumbs
        title="فرم ایجاد دوره"
        data={[ { title: "فرم ایجاد دوره" }]}
      />
      <Row>
        <Col sm="12">
          <WizardHorizontal />
        </Col>
      </Row>
    </Fragment>
  );
};
export default Wizard;
