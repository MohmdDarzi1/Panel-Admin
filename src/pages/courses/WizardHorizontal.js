// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import SocialLinks from "./steps-with-validation/SocialLinks";
import AccountDetails from "./steps-with-validation/AccountDetails";
import { useCourseDetails } from "../../@core/services/api/courses";
import { useParams } from "react-router";

const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null);



  // const { data } = useCourseDetails(id);
  // console.log("courseDetail", data);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [courseId, setCourseId] = useState(null);

  const steps = [
    {
      id: "account-details",
      title: "اطلاعات دوره",
      subtitle: "اطلاعات دوره مورد نظر را وارد کنید",
      content: (
        <AccountDetails
          courseId={courseId}
          setCourseId={setCourseId}
          stepper={stepper}
        />
      ),
    },

    {
      id: "social-links",
      title: "افزودن تکنولوژی",
      subtitle: "تکنولوژی را وارد نمائید.",
      content: <SocialLinks courseId={courseId} stepper={stepper} />,
    },
  ];

  return (
    <div className="horizontal-wizard">
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default WizardHorizontal;
