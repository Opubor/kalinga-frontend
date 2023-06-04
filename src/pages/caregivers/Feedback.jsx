import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from "../services/axios";
import { toast } from "react-toastify";
import InputField from "../../components/InputField.component";
import CareGiverLayout from "../../layout/CareGiverLayout";

function Feedback() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [feedback, setFeedback] = useState({
    caregivernote: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFeedback((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [checkedValues, setCheckedValues] = useState({
    morningcompleted: "",
    morningcancelled: "",
    afternooncompleted: "",
    afternooncancelled: "",
    eveningcompleted: "",
    eveningcancelled: "",
  });
  function handleCheckedValues(e) {
    setCheckedValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  }

  // Getting Query From URL
  let search = useLocation().search;
  const id = new URLSearchParams(search).get("edit");

  // To Get Current Details
  useEffect(() => {
    axios.get(`/appointments/?edit=${id}`).then((response) => {
      setFeedback(response?.data);
      setCheckedValues(response?.data);
    });
  }, []);

  // To Update Staff
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/appointmentfeedback/${id}`, {
        morningcompleted: checkedValues?.morningcompleted,
        morningcancelled: checkedValues?.morningcancelled,
        afternooncompleted: checkedValues?.afternooncompleted,
        afternooncancelled: checkedValues?.afternooncancelled,
        eveningcompleted: checkedValues?.eveningcompleted,
        eveningcancelled: checkedValues?.eveningcancelled,
        caregivernote: feedback?.caregivernote,
      })
      .then((res) => {
        navigate("/caregiver/appointments", { replace: true }),
          toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  return (
    <CareGiverLayout>
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="flex flex-col gap-5.5 sm:flex-row">
            {/* ==============Morning Session============ */}
            {feedback?.morningsession === "true" && (
              <>
                <InputField
                  className="w-full flex gap-2 itms-center md:w-1/3 px-2 mb-5.5"
                  label="Morning Completed"
                  name="morningcompleted"
                  type="checkbox"
                  onChange={handleCheckedValues}
                  value={feedback?.morningcompleted}
                  defaultChecked={
                    feedback?.morningcompleted === "true" ? true : false
                  }
                />
                <InputField
                  className="w-full flex gap-2 itms-center md:w-1/3 px-2 mb-5.5"
                  label="Morning Cancelled"
                  name="morningcancelled"
                  type="checkbox"
                  onChange={handleCheckedValues}
                  value={feedback?.morningcancelled}
                  defaultChecked={
                    feedback?.morningcancelled === "true" ? true : false
                  }
                />
              </>
            )}
          </div>
          {/* ==============Afternoon Session============ */}
          <div className="flex flex-col gap-5.5 sm:flex-row">
            {feedback?.afternoonsession === "true" && (
              <>
                <InputField
                  className="w-full flex gap-2 itms-center md:w-1/3 px-2 mb-5.5"
                  label="Afternoon Completed"
                  name="afternooncompleted"
                  type="checkbox"
                  onChange={handleCheckedValues}
                  value={feedback?.afternooncompleted}
                  defaultChecked={
                    feedback?.afternooncompleted === "true" ? true : false
                  }
                />
                <InputField
                  className="w-full flex gap-2 itms-center md:w-1/3 px-2 mb-5.5"
                  label="Afternoon Cancelled"
                  name="afternooncancelled"
                  type="checkbox"
                  onChange={handleCheckedValues}
                  value={feedback?.afternooncancelled}
                  defaultChecked={
                    feedback?.afternooncancelled === "true" ? true : false
                  }
                />
              </>
            )}
          </div>
          {/* ==============Evening Session============ */}
          <div className="flex flex-col gap-5.5 sm:flex-row">
            {feedback?.eveningsession === "true" && (
              <>
                <InputField
                  className="w-full flex gap-2 itms-center md:w-1/3 px-2 mb-5.5"
                  label="Evening Completed"
                  name="eveningcompleted"
                  type="checkbox"
                  onChange={handleCheckedValues}
                  value={feedback?.eveningcompleted}
                  defaultChecked={
                    feedback?.eveningcompleted === "true" ? true : false
                  }
                />
                <InputField
                  className="w-full flex gap-2 itms-center md:w-1/3 px-2 mb-5.5"
                  label="Evening Cancelled"
                  name="eveningcancelled"
                  type="checkbox"
                  onChange={handleCheckedValues}
                  value={feedback?.eveningcancelled}
                  defaultChecked={
                    feedback?.eveningcancelled === "true" ? true : false
                  }
                />
              </>
            )}
          </div>

          <div className="flex flex-col gap-5.5 sm:flex-row mb-5.5">
            <div className="w-full">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Caregiver Note
              </label>
              <textarea
                name="caregivernote"
                onChange={handleChange}
                value={feedback?.caregivernote}
                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>
          </div>
          <div className="mb-6 flex gap-4">
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </form>{" "}
    </CareGiverLayout>
  );
}

export default Feedback;
