import React, { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useQueryParam, NumberParam } from "use-query-params";
import { Formik } from "formik";
import * as Yup from "yup";
import { Steps, Button, Col, Row, message } from "antd";
import * as FormSteps from "./steps";
import { FormDebug } from "components/Form";

export const FormContext = createContext({});

const STEPS = [
  {
    title: "Keywords",
    validationSchema: Yup.object().shape({
      keywords: Yup.string()
        .nullable()
        .required(),
      inTitle: Yup.bool()
    })
  },
  {
    title: "Language",
    validationSchema: Yup.object().shape({
      language: Yup.string()
        .nullable()
        .required()
    })
  },
  {
    title: "Date",
    validationSchema: Yup.object().shape({
      from: Yup.string().nullable(),
      to: Yup.string().nullable()
    })
  },
  {
    title: "Review"
  }
];

// TODO: change color and show errors count
const customDot = (dot, { status, index }) => dot;

const Form = ({ onSubmit }) => {
  const [stepQuery, setStepQuery] = useQueryParam("step", NumberParam);
  const [currentStep, setCurrentStep] = useState(stepQuery || 1);

  useEffect(() => {
    console.log("Everything Form mount");
    if (stepQuery > 1) {
      setStepQuery(1);
      setCurrentStep(1);
    }
  }, []);

  const isFirstPage = currentStep === 1;
  const isLastPage = currentStep === STEPS.length;

  const goNext = useCallback(() => {
    const nextStep = currentStep + 1;
    setStepQuery(nextStep);
    setCurrentStep(() => nextStep);
  }, [currentStep, setStepQuery]);

  const goPrev = useCallback(() => {
    const prevStep = currentStep - 1;
    setStepQuery(prevStep);
    setCurrentStep(() => prevStep);
  }, [currentStep, setStepQuery]);

  const initialValues = {
    keywords: null,
    inTitle: false,
    language: null,
    from: null,
    to: null
  };

  const getValidationSchema = () => {
    // Get first as default and concat all for before current step
    let validationSchema = STEPS[0].validationSchema;
    [...Array(currentStep)].map((_, i) => {
      if (i && STEPS[i].validationSchema) {
        validationSchema = validationSchema.concat(STEPS[i].validationSchema);
      }
    });
    return validationSchema;
  };

  const showErrors = (errors, setFieldTouched, nextAction) => {
    const errorsKeys = Object.keys(errors);
    if (errorsKeys.length) {
      for (let name in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, name)) {
          setFieldTouched(name, true);
        }
      }
      message.error(`Please, feel all required fields.`);
      message.error(
        `${errorsKeys.join(", ")} ${
          errorsKeys.length > 1 ? "are" : "is"
        } required.`
      );
    } else if (nextAction) {
      nextAction();
    }
  };

  return (
    <FormContext.Provider value={{ test: "test" }}>
      <Formik
        onSubmit={onSubmit}
        validationSchema={getValidationSchema()}
        initialValues={initialValues}
        enableReinitialize
      >
        {({
          values,
          handleSubmit,
          isValid,
          dirty,
          isSubmitting,
          validateForm,
          setFieldTouched
        }) => (
          <>
            <Steps
              current={currentStep - 1}
              progressDot={customDot}
              style={{ maxWidth: 800, margin: "1rem auto 2rem" }}
            >
              {STEPS.map((step, index) => (
                <Steps.Step key={step.title} title={step.title} />
              ))}
            </Steps>
            <form
              onSubmit={handleSubmit}
              style={{ maxWidth: 600, margin: "0 auto" }}
            >
              {currentStep === 1 && <FormSteps.Keywords />}
              {currentStep === 2 && <FormSteps.Language />}
              {currentStep === 3 && <FormSteps.Date />}
              {currentStep === 4 && <FormSteps.Review />}
              <Row type="flex" gutter={12} justify="end">
                {!isFirstPage && (
                  <Col>
                    <Button type="default" onClick={goPrev}>
                      Back
                    </Button>
                  </Col>
                )}
                {!isLastPage && (
                  <Col>
                    <Button
                      type={isValid ? "primary" : "danger"}
                      onClick={() => {
                        validateForm(values).then(errors => {
                          showErrors(errors, setFieldTouched, goNext);
                        });
                      }}
                    >
                      Next
                    </Button>
                  </Col>
                )}
                {isLastPage && (
                  <Col>
                    <Button
                      type={isValid ? "primary" : "danger"}
                      loading={dirty && isSubmitting}
                      onClick={() => {
                        validateForm(values).then(errors => {
                          showErrors(errors, setFieldTouched, handleSubmit);
                        });
                      }}
                    >
                      Show Results
                    </Button>
                  </Col>
                )}
              </Row>
              <FormDebug />
            </form>
          </>
        )}
      </Formik>
    </FormContext.Provider>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Form;
