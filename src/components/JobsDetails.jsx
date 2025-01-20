import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { FaStar, FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Cookies from 'js-cookie'
import '../css/jobsDetail.css'
import Navbar from './Navbar';

const JobsDetails = () => {
  const { id } = useParams()
  const [jobsItem, setJobsItem] = useState({})
  const [loading, setLoading] = useState(true)
  const [similarJobs, setSimilarJobs] = useState({})

  useEffect(() => {

    const token = Cookies.get("jwt-token");

    const fetchJobsDetails = async () => {

      const api = `https://apis.ccbp.in/jobs/${id}`;

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
          setJobsItem(data.job_details);
          setSimilarJobs(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchJobsDetails();

  }, [id]);

  return (
    <>
      <Navbar />
      <div>
        {loading ?
          <div className='d-flex justify-content-center align-items-center' style={{ height: "75vh" }}>
            <div className='loader'></div>
          </div>
          :
          <>
            <div className='d-flex justify-content-center mt-5'>
              <div className='jobCard jobDetails w-75 p-4 mb-3 bg-dark bg-gradient text-white'>
                <div className='d-flex'>
                  <img src={jobsItem.company_logo_url} width="10%" />
                  <div className='m-4'>
                    <h2 className='jobTitle'>{jobsItem.title}</h2>
                    <FaStar className="ratingIcon" />
                    <span className='rating '>{jobsItem.rating}</span>
                  </div>
                </div>
                <div className="mt-3 d-flex justify-content-between">
                  <div>
                    <FaLocationDot className="locationIcon text-danger" />
                    <span className='fw-bold loction'>{jobsItem.location}</span>
                    <FaBriefcase className="jobTypeIcon text-secondary" />
                    <span className='fw-bold'>{jobsItem.employment_type}</span>
                  </div>
                  <h5 className='fw-bolder'>{jobsItem.package_per_annum}</h5>
                </div>
                <hr />
                <h5 className='fw-bold'>Description</h5>
                <p>{jobsItem.job_description}</p>

                <div >
                  <h5 className='fw-bold mt-4 mb-3' >Skills</h5>
                  <ul className='d-flex flex-wrap gap-5 list-unstyled'>
                    {jobsItem.skills.map((item) => (
                      <li key={item.name} >
                        <img src={item.image_url} alt={item.name} width="40px" />
                        <span className='fw-bold' style={{ marginLeft: "10px" }}>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <div className='mt-5 container-fluid container-lg similarJobs' style={{ width: "77%" }} >
                <h2 className='fw-bold mt-4 mb-5'>Similar Jobs</h2>
                <div className=' d-flex flex-wrap gap-5'>
                  {similarJobs.similar_jobs.map((item) => (
                    <NavLink className='similarjobsLink' to={`/jobs/${item.id}`} style={{ textDecoration: "none", color: "black", width: "40%" }}>
                      <div key={item.id} style={{ width: "100%" }} className='jobCard p-4 mb-3 bg-dark bg-gradient text-white'>
                        <div className='d-flex'>
                          <img src={item.company_logo_url} width="25%" />
                          <div className='m-4'>
                            <h2 className='jobTitle'>{item.title}</h2>
                            <FaStar className="ratingIcon" />
                            <span className='rating '>{item.rating}</span>
                          </div>
                        </div>
                        <div className="mt-3 d-flex justify-content-between">
                          <div>
                            <FaLocationDot className="locationIcon text-danger" />
                            <span className='fw-bold loction'>{item.location}</span>
                            <FaBriefcase className="jobTypeIcon text-secondary" />
                            <span className='fw-bold'>{item.employment_type}</span>
                          </div>
                        </div>
                        <hr />
                        <h5 className='fw-bold'>Description</h5>
                        <p>{jobsItem.job_description}</p>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default JobsDetails