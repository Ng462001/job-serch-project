import React, { useEffect, useState } from 'react'
import '../css/jobSideBar.css'
import Cookies from 'js-cookie'

const JobSideBar = ({ changeEmpType, changeSalary }) => {

  const [data, setData] = useState("")
  const [loading, setLoading] = useState(false)


  useEffect(() => {

    const token = Cookies.get("jwt-token");

    const fetchProfile = async () => {

      const api = "https://apis.ccbp.in/profile"

      const options = {
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      try {
        setLoading(true);

        const response = await fetch(api, options);

        const data = await response.json();

        if (response.ok === true) {
          setLoading(false);
          setData(data.profile_details);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile();
  }, []);

  const employmentTypesList = [
    {
      label: 'Full Time',
      employmentTypeId: 'FULLTIME',
    },
    {
      label: 'Part Time',
      employmentTypeId: 'PARTTIME',
    },
    {
      label: 'Freelance',
      employmentTypeId: 'FREELANCE',
    },
    {
      label: 'Internship',
      employmentTypeId: 'INTERNSHIP',
    },
  ]

  const salaryRangesList = [
    {
      salaryRangeId: '1000000',
      label: '10 LPA and above',
    },
    {
      salaryRangeId: '2000000',
      label: '20 LPA and above',
    },
    {
      salaryRangeId: '3000000',
      label: '30 LPA and above',
    },
    {
      salaryRangeId: '4000000',
      label: '40 LPA and above',
    },
  ]

  const renderSalaryRangesTypes = () => (
    <>
      <h2 className="filter-heading mt-4 mb-4 fw-bold">Salary Range</h2>
      <ul className="filters-list">
        {
          salaryRangesList.map(eachRange => (
            <li className="fliters-list-item" key={eachRange.salaryRangeId}>
              <input
                type="radio"
                className="form-check-input mb-3"
                value={eachRange.salaryRangeId}
                id={eachRange.salaryRangeId}
                name="salary ranges"
                onChange={handleOnSalaryChange}
              />
              <label htmlFor={eachRange.salaryRangeId} className="filter-label">
                {eachRange.label}
              </label>
            </li>
          ))
        }
      </ul>
    </>
  )

  const renderEmploymentTypes = () => (
    <>
      <h2 className="filter-heading mt-4 mb-4 fw-bold">Type of Employment</h2>
      <ul className="filters-list">
        {
          employmentTypesList.map(eachType =>
          (
            <li className="fliters-list-item" key={eachType.employmentTypeId}>
              <input
                type="checkbox"
                className="form-check-input mb-3 mr-3"
                value={eachType.employmentTypeId}
                id={eachType.employmentTypeId}
                onChange={handleOnChangeEmpType}
              />
              <label htmlFor={eachType.employmentTypeId} className="filter-label">
                {eachType.label}
              </label>
            </li>
          )
          )
        }
      </ul>
    </>
  )

  const handleOnChangeEmpType = (e) => {
    changeEmpType(e)
  }

  const handleOnSalaryChange = (e) => {
    changeSalary(e)
  }


  const profileDetails = () => (
    <div className="col mt-4 ">
      <div className="card">
        {loading ?
          <>
            <div className='d-flex justify-content-center align-items-center w-100 vh-100'>
              <div className='loader'></div>
            </div>
          </>
          :
          <>
            <img src={data.profile_image_url} className="img-card" alt="Image" />
            <h4 className="fw-bold">{data.name}</h4>
            <p className="fw-bold">{data.short_bio}</p>
          </>
        }
      </div>
    </div>
  )

  return (
    <>
      <div
        className='sticky-lg-top'
        style={{
          top: "140px",
          overflowY: "scroll",
          height: "calc(100vh - 140px)"
        }}
      >
        {profileDetails()}
        <hr className='mt-5' />
        {renderEmploymentTypes()}
        <hr className='mt-4' />
        {renderSalaryRangesTypes()}
        <div>
          
        </div>
      </div>
    </>
  )

}

export default JobSideBar