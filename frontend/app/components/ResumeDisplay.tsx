import React from "react";
import { ResumeData } from "../types/ResumeData";

interface ResumePageProps {
  resumeData: ResumeData;
}

const ResumePage: React.FC<ResumePageProps> = ({ resumeData }) => {
  if (!resumeData) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{resumeData.personal.name}</h1>
        {resumeData.summary && (
          <ul className="mt-2 list-disc list-inside">
            {resumeData.summary.map((summaryItem, index) => (
              <li key={index} className="mt-1">
                {summaryItem}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-around mt-4">
        <p>Phone: {resumeData.personal.phone}</p>
        <p>
          Email:{" "}
          <a
            href={`mailto:${resumeData.personal.email}`}
            className="text-blue-500 hover:text-blue-700"
          >
            {resumeData.personal.email}
          </a>
        </p>
      </div>

      <div className="flex justify-around mt-4">
        {resumeData.personal.github && (
          <a
            href={resumeData.personal.github}
            className="text-blue-500 hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        )}
        {resumeData.personal.linkedin && (
          <a
            href={resumeData.personal.linkedin}
            className="text-blue-500 hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Work Experience</h2>
        {resumeData.work.map((job, index) => (
          <div key={index} className="mt-4">
            <h3 className="font-semibold">{`${job.role} at ${job.company}, ${job.from} - ${job.to}`}</h3>
            {job.description.map((desc, idx) => (
              <p key={idx} className="mt-1">
                {desc}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mt-4">
            <h3 className="font-semibold">{`${edu.degree} at ${edu.university}, ${edu.from} - ${edu.to}`}</h3>
            <p>{edu.grade && `Grade: ${edu.grade}`}</p>
            {edu.coursework && (
              <ul className="list-none pl-0 mt-1">
                {edu.coursework.map((course, idx) => (
                  <li key={idx}>{course}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Skills</h2>
        <ul className="list-none pl-0 mt-1">
          {resumeData.skill_section.map((skill, index) => (
            <li key={index} className="mt-1">
              <span className="font-semibold">{skill.name}:</span>{" "}
              {skill.skills.join(", ")}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Projects</h2>
        {resumeData.projects.map((project, index) => (
          <div key={index} className="mt-4">
            <h3 className="font-semibold">{project.name}</h3>
            {project.description.map((desc, idx) => (
              <p key={idx} className="mt-1">
                {desc}
              </p>
            ))}
            {project.link && (
              <a
                href={project.link}
                className="text-blue-500 hover:text-blue-700 mt-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Project Link
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Achievements</h2>
        <ul className="list-none pl-0 mt-1">
          {resumeData.achievements.map((achieve, index) => (
            <li key={index} className="mt-1">
              {achieve}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResumePage;
