import React, { FC } from "react";
import style from "./Bio.module.scss";
import littleone from "../../assets/littleone.jpg";

export const Bio: FC = () => {
  return (
    <>
      <main className={style.container}>
        <section className={style.item1}>
          <div className={style.img}>
            <img src={littleone} alt="Developer Photo"></img>
          </div>
          <div className={style.heading1}>
            <h1>Aleksandra Marszałek | Junior Frontend Developer</h1>
          </div>
          <div className={style.bio1}>
            <p>
              I started my coding adventure with Software Development Academy's
              "Javascript for Beginners" course in 2022. This decision was
              inspired by past experiences with managing a Wordpress company
              site and working in email marketing, where each bug had to be
              solved by more qualified IT specialists. Naturally, this sparked
              my curiosity and I've been learning HTML, CSS, GIT, JavaScript,
              React.js ever since. I plan to grow as a Frontend Developer and
              learn Node.js in the nearest future. Currently, I work as a
              Marketing Campaign Specialist, although I have also worked in
              Sales and Customer Service. I hold a Master's degree in
              Comparative Literature and continue learning Spanish.
            </p>
          </div>
        </section>
        <section className={style.item2}>
          <div className={style.heading2}>
            <h2>Experience</h2>
          </div>
          <div className={style.bio2}>
            <div className={style.bio2item1}>
              <h4>Software Development Academy</h4>
              <p>
                With SDA, I took part in a Javascript for Beginners course that
                spanned over 10 months and covered basic and advanced HTML, CSS and
                Javascript. On top of that, the course included GIT and CMS
                workshops. We got to practice creating projects using Bootstrap
                and Material UI, but the main focus in the last months was
                React.js.
              </p>
            </div>
            <div className={style.bio2item2}>
              <h4>Marketing Campaign Specialist at METTLER TOLEDO</h4>
              <p>
                For over 2 years, I have been working as a Marketing Campaign
                Specialist in an international team focused mostly on
                centralized email marketing campaigns. At MT, I got to work with
                tools such as Oracle Eloqua, Adobe Analytics or AEM. Apart from
                being responsible for successful send-outs for the biggest
                division at the company, I also manage international marketing
                projects and curate reports to gain insight into campaign
                performance.{" "}
              </p>
            </div>
          </div>
          <div className={style.aside2}>
            <h4>Technologies and Tools</h4>
            <ul>
              <li>React.js</li>
              <li>Javascript</li>
              <li>HTML5</li>
              <li>CSS3</li>
              <li>Bootstrap</li>
              <li>CMS (Wordpress)</li>
              <li>Oracle Eloqua</li>
              <li>Adobe Analytics</li>
              <li>AEM</li>
              <li>Excel and PowerPoint</li>
              <li>Canva</li>
              <li>Figma</li>
            </ul>
          </div>
        </section>

        <section className={style.item3}>
          <div className={style.aside3}>
            <h4>Languages</h4>
            <ul>
              <li>English - C2</li>
              <li>Spanish - C1</li>
              <li>Polish - native</li>
              <li>German - A2</li>
            </ul>
          </div>
          <div className={style.heading3}>
            <h2>Education</h2>
          </div>
          <div className={style.bio3}>
            <div className={style.bio3item1}>
              <h4>Jagiellonian University in Cracow and Universiteit i Oslo</h4>
              <p>
                For both Bachelor's and Master's degrees, I studied
                Interdisciplinary Individual Studies in the Humanities,
                completing a diploma in Comparative Literature. In 2016, I
                enrolled in the Erasmus program and spent a semester at the
                University of Oslo, where I got to study in classes about Edvard
                Munch, Henrik Ibsen, sociology of literature.
              </p>
            </div>
            <div className={style.bio3item2}>
              <h4>Monet International School</h4>
              <p>
                In 2012, I graduated from the International Baccalaureate
                Diploma Program, which allowed me to become comfortable in using
                English in both speaking and writing.
              </p>
            </div>
          </div>
        </section>
        {/* <section className='projects'></section> */}
      </main>
    </>
  );
};
