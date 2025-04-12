import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaAward,
  FaCog,
  FaEdit,
  FaUser,
  FaBook,
  FaCode,
  FaCalendarAlt,
  FaCertificate,
  FaTrophy,
  FaFire,
  FaChartLine,
  FaQrcode,
  FaLock,
  FaTrash,
  FaCheck,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";
import { IoMdSchool } from "react-icons/io";
import {
  MdComputer,
  MdSettings,
  MdEmail,
  MdVisibility,
  MdMessage,
} from "react-icons/md";
import { GiAchievement, GiSkills } from "react-icons/gi";
import { BsFillLightbulbFill, BsFillLightbulbOffFill } from "react-icons/bs";

const ProfileSection = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);

  const [userData, setUserData] = useState({
    basic: {
      profilePic: "https://via.placeholder.com/150",
      fullName: "Alex Johnson",
      username: "alex_codes",
      bio: "Passionate developer focusing on React and Node.js. Always learning!",
      gender: "Male",
      dob: "1998-05-12",
      location: "San Francisco, CA",
      timezone: "PST (UTC-8)",
    },
    academic: {
      university: "Stanford University",
      degree: "B.S. Computer Science",
      major: "Software Engineering",
      year: "3rd Year",
      enrollmentNo: "ST20210789",
      email: "alex.j@stanford.edu",
    },
    skills: {
      skillLevel: "Intermediate",
      techStack: ["React", "Node.js", "MongoDB", "Express", "Python"],
      interests: ["Machine Learning", "Web Development", "Cloud Computing"],
      learningStyle: "Visual + Practical",
      dailyCommitment: "3 hours",
      streak: 42,
      coursesCompleted: 15,
      problemsSolved: 287,
    },
    social: {
      github: "github.com/alexjcodes",
      linkedin: "linkedin.com/in/alexjohnson",
      portfolio: "alexjohnson.dev",
    },
    achievements: {
      certificates: [
        "AWS Certified Developer",
        "MongoDB Basics",
        "React Mastery",
      ],
      codingStreak: "42 days",
      challengesCompleted: 24,
      rank: "Top 5% in University",
      openSource: 7,
      hackathons: 3,
    },
    privacy: {
      emailUpdates: true,
      allowDiscoverability: true,
      allowMessaging: true,
      darkMode: false,
    },
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
    }
  }, [darkMode]);

  useEffect(() => {
    if (activeTab === "skills") {
      setTimeout(() => setAnimateStats(true), 300);
    } else {
      setAnimateStats(false);
    }
  }, [activeTab]);

  const handleEdit = (section) => {
    setIsEditing(true);
    setEditSection(section);
  };

  const handleSave = () => {
    setIsEditing(false);
    setEditSection("");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditSection("");
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    setUserData((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, darkMode: !darkMode },
    }));
  };

  return (
    <ProfileContainer className={darkMode ? "dark-theme" : ""}>
      <ProfileHeader>
        <ProfilePic
          src={userData.basic.profilePic}
          alt={userData.basic.fullName}
        />
        <HeaderInfo>
          <NameSection>
            <h1>{userData.basic.fullName}</h1>
            <Username>@{userData.basic.username}</Username>
          </NameSection>
          <HeaderMeta>
            <MetaItem>
              <FaMapMarkerAlt size={14} />
              <span>{userData.basic.location}</span>
            </MetaItem>
            <MetaItem>
              <FaClock size={14} />
              <span>{userData.basic.timezone}</span>
            </MetaItem>
          </HeaderMeta>
          <BioText>{userData.basic.bio}</BioText>
          <SocialLinks>
            <SocialLink
              href={`https://${userData.social.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={18} />
            </SocialLink>
            <SocialLink
              href={`https://${userData.social.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={18} />
            </SocialLink>
            <SocialLink href={`mailto:${userData.academic.email}`}>
              <FaEnvelope size={18} />
            </SocialLink>
          </SocialLinks>
        </HeaderInfo>
        <DarkModeToggle onClick={handleDarkModeToggle}>
          {darkMode ? (
            <BsFillLightbulbFill size={20} />
          ) : (
            <BsFillLightbulbOffFill size={20} />
          )}
        </DarkModeToggle>
      </ProfileHeader>

      <TabContainer>
        <TabButton
          active={activeTab === "basic"}
          onClick={() => setActiveTab("basic")}
        >
          <FaUser size={14} />
          <span>Basic Info</span>
        </TabButton>
        <TabButton
          active={activeTab === "academic"}
          onClick={() => setActiveTab("academic")}
        >
          <IoMdSchool size={14} />
          <span>Academic</span>
        </TabButton>
        <TabButton
          active={activeTab === "skills"}
          onClick={() => setActiveTab("skills")}
        >
          <GiSkills size={14} />
          <span>Skills</span>
        </TabButton>
        <TabButton
          active={activeTab === "achievements"}
          onClick={() => setActiveTab("achievements")}
        >
          <GiAchievement size={14} />
          <span>Achievements</span>
        </TabButton>
        <TabButton
          active={activeTab === "privacy"}
          onClick={() => setActiveTab("privacy")}
        >
          <MdSettings size={14} />
          <span>Settings</span>
        </TabButton>
      </TabContainer>

      <TabContent>
        {activeTab === "basic" && (
          <SectionCard>
            <SectionHeader>
              <h2>Basic Information</h2>
              <EditButton onClick={() => handleEdit("basic")}>
                <FaEdit size={14} />
                Edit
              </EditButton>
            </SectionHeader>
            {isEditing && editSection === "basic" ? (
              <EditForm>
                <FormGroup>
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={userData.basic.fullName}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        basic: { ...userData.basic, fullName: e.target.value },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Username</label>
                  <input
                    type="text"
                    value={userData.basic.username}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        basic: { ...userData.basic, username: e.target.value },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Bio</label>
                  <textarea
                    value={userData.basic.bio}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        basic: { ...userData.basic, bio: e.target.value },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Gender</label>
                  <select
                    value={userData.basic.gender}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        basic: { ...userData.basic, gender: e.target.value },
                      })
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={userData.basic.dob}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        basic: { ...userData.basic, dob: e.target.value },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Location</label>
                  <input
                    type="text"
                    value={userData.basic.location}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        basic: { ...userData.basic, location: e.target.value },
                      })
                    }
                  />
                </FormGroup>
                <ButtonGroup>
                  <SaveButton onClick={handleSave}>
                    <FaCheck size={14} /> Save Changes
                  </SaveButton>
                  <CancelButton onClick={handleCancelEdit}>
                    <FaTimes size={14} /> Cancel
                  </CancelButton>
                </ButtonGroup>
              </EditForm>
            ) : (
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>Full Name</InfoLabel>
                  <InfoValue>{userData.basic.fullName}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Username</InfoLabel>
                  <InfoValue>@{userData.basic.username}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Gender</InfoLabel>
                  <InfoValue>{userData.basic.gender}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Date of Birth</InfoLabel>
                  <InfoValue>
                    {new Date(userData.basic.dob).toLocaleDateString()}
                  </InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Location</InfoLabel>
                  <InfoValue>{userData.basic.location}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Time Zone</InfoLabel>
                  <InfoValue>{userData.basic.timezone}</InfoValue>
                </InfoItem>
              </InfoGrid>
            )}
          </SectionCard>
        )}

        {activeTab === "academic" && (
          <SectionCard>
            <SectionHeader>
              <h2>Academic Details</h2>
              <EditButton onClick={() => handleEdit("academic")}>
                <FaEdit size={14} />
                Edit
              </EditButton>
            </SectionHeader>
            {isEditing && editSection === "academic" ? (
              <EditForm>
                <FormGroup>
                  <label>University/College</label>
                  <input
                    type="text"
                    value={userData.academic.university}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        academic: {
                          ...userData.academic,
                          university: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Degree</label>
                  <input
                    type="text"
                    value={userData.academic.degree}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        academic: {
                          ...userData.academic,
                          degree: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Major</label>
                  <input
                    type="text"
                    value={userData.academic.major}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        academic: {
                          ...userData.academic,
                          major: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Year of Study</label>
                  <input
                    type="text"
                    value={userData.academic.year}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        academic: {
                          ...userData.academic,
                          year: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Enrollment Number</label>
                  <input
                    type="text"
                    value={userData.academic.enrollmentNo}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        academic: {
                          ...userData.academic,
                          enrollmentNo: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>College Email ID</label>
                  <input
                    type="email"
                    value={userData.academic.email}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        academic: {
                          ...userData.academic,
                          email: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
                <ButtonGroup>
                  <SaveButton onClick={handleSave}>
                    <FaCheck size={14} /> Save Changes
                  </SaveButton>
                  <CancelButton onClick={handleCancelEdit}>
                    <FaTimes size={14} /> Cancel
                  </CancelButton>
                </ButtonGroup>
              </EditForm>
            ) : (
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>University/College</InfoLabel>
                  <InfoValue>{userData.academic.university}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Degree Program</InfoLabel>
                  <InfoValue>{userData.academic.degree}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Major/Branch</InfoLabel>
                  <InfoValue>{userData.academic.major}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Year of Study</InfoLabel>
                  <InfoValue>{userData.academic.year}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Enrollment Number</InfoLabel>
                  <InfoValue>{userData.academic.enrollmentNo}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>College Email</InfoLabel>
                  <InfoValue>{userData.academic.email}</InfoValue>
                </InfoItem>
              </InfoGrid>
            )}
          </SectionCard>
        )}

        {activeTab === "skills" && (
          <SectionCard>
            <SectionHeader>
              <h2>Skills & Learning</h2>
              <EditButton onClick={() => handleEdit("skills")}>
                <FaEdit size={14} />
                Edit
              </EditButton>
            </SectionHeader>
            {isEditing && editSection === "skills" ? (
              <EditForm>
                <FormGroup>
                  <label>Self-Rated Skill Level</label>
                  <select
                    value={userData.skills.skillLevel}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        skills: {
                          ...userData.skills,
                          skillLevel: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <label>Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={userData.skills.techStack.join(", ")}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        skills: {
                          ...userData.skills,
                          techStack: e.target.value.split(", ").filter(Boolean),
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Learning Interests (comma separated)</label>
                  <input
                    type="text"
                    value={userData.skills.interests.join(", ")}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        skills: {
                          ...userData.skills,
                          interests: e.target.value.split(", ").filter(Boolean),
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Learning Style</label>
                  <input
                    type="text"
                    value={userData.skills.learningStyle}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        skills: {
                          ...userData.skills,
                          learningStyle: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Daily Commitment</label>
                  <input
                    type="text"
                    value={userData.skills.dailyCommitment}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        skills: {
                          ...userData.skills,
                          dailyCommitment: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
                <ButtonGroup>
                  <SaveButton onClick={handleSave}>
                    <FaCheck size={14} /> Save Changes
                  </SaveButton>
                  <CancelButton onClick={handleCancelEdit}>
                    <FaTimes size={14} /> Cancel
                  </CancelButton>
                </ButtonGroup>
              </EditForm>
            ) : (
              <>
                <InfoGrid>
                  <InfoItem>
                    <InfoLabel>Self-Rated Skill Level</InfoLabel>
                    <InfoValue>{userData.skills.skillLevel}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Daily Learning Commitment</InfoLabel>
                    <InfoValue>{userData.skills.dailyCommitment}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Preferred Learning Style</InfoLabel>
                    <InfoValue>{userData.skills.learningStyle}</InfoValue>
                  </InfoItem>
                </InfoGrid>

                <SkillsSection>
                  <h3>Tech Stack</h3>
                  <TagsContainer>
                    {userData.skills.techStack.map((tech, index) => (
                      <Tag key={`tech-${index}`}>
                        <MdComputer size={14} /> {tech}
                      </Tag>
                    ))}
                  </TagsContainer>
                </SkillsSection>

                <SkillsSection>
                  <h3>Learning Interests</h3>
                  <TagsContainer>
                    {userData.skills.interests.map((interest, index) => (
                      <Tag key={`interest-${index}`} variant="secondary">
                        <BsFillLightbulbFill size={14} /> {interest}
                      </Tag>
                    ))}
                  </TagsContainer>
                </SkillsSection>

                <StatisticsSection>
                  <h3>Progress & Statistics</h3>
                  <StatsGrid>
                    <StatCard animate={animateStats}>
                      <StatIcon>
                        <FaFire size={20} />
                      </StatIcon>
                      <StatNumber>{userData.skills.streak}</StatNumber>
                      <StatLabel>Day Streak</StatLabel>
                      <ProgressBar
                        width={
                          userData.skills.streak > 100
                            ? 100
                            : userData.skills.streak
                        }
                      />
                    </StatCard>
                    <StatCard animate={animateStats} delay="0.2s">
                      <StatIcon>
                        <FaBook size={20} />
                      </StatIcon>
                      <StatNumber>
                        {userData.skills.coursesCompleted}
                      </StatNumber>
                      <StatLabel>Courses Completed</StatLabel>
                      <ProgressBar
                        width={(userData.skills.coursesCompleted / 20) * 100}
                      />
                    </StatCard>
                    <StatCard animate={animateStats} delay="0.4s">
                      <StatIcon>
                        <FaCode size={20} />
                      </StatIcon>
                      <StatNumber>{userData.skills.problemsSolved}</StatNumber>
                      <StatLabel>Problems Solved</StatLabel>
                      <ProgressBar
                        width={(userData.skills.problemsSolved / 500) * 100}
                      />
                    </StatCard>
                  </StatsGrid>
                </StatisticsSection>
              </>
            )}
          </SectionCard>
        )}

        {activeTab === "achievements" && (
          <SectionCard>
            <SectionHeader>
              <h2>Achievements & Contributions</h2>
              <EditButton onClick={() => handleEdit("achievements")}>
                <FaEdit size={14} />
                Edit
              </EditButton>
            </SectionHeader>
            {isEditing && editSection === "achievements" ? (
              <EditForm>
                <FormGroup>
                  <label>Certificates (comma separated)</label>
                  <textarea
                    value={userData.achievements.certificates.join(", ")}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        achievements: {
                          ...userData.achievements,
                          certificates: e.target.value
                            .split(", ")
                            .filter(Boolean),
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Current Coding Streak</label>
                  <input
                    type="text"
                    value={userData.achievements.codingStreak}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        achievements: {
                          ...userData.achievements,
                          codingStreak: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Challenges Completed</label>
                  <input
                    type="number"
                    value={userData.achievements.challengesCompleted}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        achievements: {
                          ...userData.achievements,
                          challengesCompleted: Number(e.target.value),
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Current Rank</label>
                  <input
                    type="text"
                    value={userData.achievements.rank}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        achievements: {
                          ...userData.achievements,
                          rank: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Open Source Contributions</label>
                  <input
                    type="number"
                    value={userData.achievements.openSource}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        achievements: {
                          ...userData.achievements,
                          openSource: Number(e.target.value),
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <label>Hackathons Participated</label>
                  <input
                    type="number"
                    value={userData.achievements.hackathons}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        achievements: {
                          ...userData.achievements,
                          hackathons: Number(e.target.value),
                        },
                      })
                    }
                  />
                </FormGroup>
                <ButtonGroup>
                  <SaveButton onClick={handleSave}>
                    <FaCheck size={14} /> Save Changes
                  </SaveButton>
                  <CancelButton onClick={handleCancelEdit}>
                    <FaTimes size={14} /> Cancel
                  </CancelButton>
                </ButtonGroup>
              </EditForm>
            ) : (
              <>
                <AchievementGrid>
                  <AchievementCard>
                    <AchievementIcon>
                      <FaFire size={24} />
                    </AchievementIcon>
                    <AchievementTitle>Coding Streak</AchievementTitle>
                    <AchievementValue>
                      {userData.achievements.codingStreak}
                    </AchievementValue>
                  </AchievementCard>
                  <AchievementCard>
                    <AchievementIcon>
                      <FaAward size={24} />
                    </AchievementIcon>
                    <AchievementTitle>Challenges Completed</AchievementTitle>
                    <AchievementValue>
                      {userData.achievements.challengesCompleted}
                    </AchievementValue>
                  </AchievementCard>
                  <AchievementCard>
                    <AchievementIcon>
                      <FaChartLine size={24} />
                    </AchievementIcon>
                    <AchievementTitle>Current Rank</AchievementTitle>
                    <AchievementValue>
                      {userData.achievements.rank}
                    </AchievementValue>
                  </AchievementCard>
                  <AchievementCard>
                    <AchievementIcon>
                      <FaCode size={24} />
                    </AchievementIcon>
                    <AchievementTitle>Open Source</AchievementTitle>
                    <AchievementValue>
                      {userData.achievements.openSource} Contributions
                    </AchievementValue>
                  </AchievementCard>
                  <AchievementCard>
                    <AchievementIcon>
                      <FaTrophy size={24} />
                    </AchievementIcon>
                    <AchievementTitle>Hackathons</AchievementTitle>
                    <AchievementValue>
                      {userData.achievements.hackathons} Participated
                    </AchievementValue>
                  </AchievementCard>
                </AchievementGrid>

                <CertificateSection>
                  <h3>Certificates</h3>
                  <CertificateList>
                    {userData.achievements.certificates.map((cert, index) => (
                      <CertificateItem key={`cert-${index}`}>
                        <FaCertificate size={16} />
                        <span>{cert}</span>
                        <FaChevronRight size={12} className="cert-arrow" />
                      </CertificateItem>
                    ))}
                  </CertificateList>
                </CertificateSection>
              </>
            )}
          </SectionCard>
        )}

        {activeTab === "privacy" && (
          <SectionCard>
            <SectionHeader>
              <h2>Privacy & Preferences</h2>
              <EditButton onClick={() => handleEdit("privacy")}>
                <FaEdit size={14} />
                Edit
              </EditButton>
            </SectionHeader>
            {isEditing && editSection === "privacy" ? (
              <EditForm>
                <FormGroup>
                  <label>Email Updates</label>
                  <SwitchContainer>
                    <Switch
                      type="checkbox"
                      checked={userData.privacy.emailUpdates}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          privacy: {
                            ...userData.privacy,
                            emailUpdates: e.target.checked,
                          },
                        })
                      }
                    />
                    <SwitchLabel>
                      <MdEmail size={16} /> Receive email updates and
                      newsletters
                    </SwitchLabel>
                  </SwitchContainer>
                </FormGroup>
                <FormGroup>
                  <label>Discoverability</label>
                  <SwitchContainer>
                    <Switch
                      type="checkbox"
                      checked={userData.privacy.allowDiscoverability}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          privacy: {
                            ...userData.privacy,
                            allowDiscoverability: e.target.checked,
                          },
                        })
                      }
                    />
                    <SwitchLabel>
                      <MdVisibility size={16} /> Allow others to discover your
                      profile
                    </SwitchLabel>
                  </SwitchContainer>
                </FormGroup>
                <FormGroup>
                  <label>Messaging</label>
                  <SwitchContainer>
                    <Switch
                      type="checkbox"
                      checked={userData.privacy.allowMessaging}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          privacy: {
                            ...userData.privacy,
                            allowMessaging: e.target.checked,
                          },
                        })
                      }
                    />
                    <SwitchLabel>
                      <MdMessage size={16} /> Allow others to message or connect
                      with you
                    </SwitchLabel>
                  </SwitchContainer>
                </FormGroup>
                <ButtonGroup>
                  <SaveButton onClick={handleSave}>
                    <FaCheck size={14} /> Save Changes
                  </SaveButton>
                  <CancelButton onClick={handleCancelEdit}>
                    <FaTimes size={14} /> Cancel
                  </CancelButton>
                </ButtonGroup>
              </EditForm>
            ) : (
              <>
                <SettingsGrid>
                  <SettingsCard>
                    <SettingsIcon>
                      <MdEmail size={24} />
                    </SettingsIcon>
                    <SettingsTitle>Email Updates</SettingsTitle>
                    <SettingsValue>
                      {userData.privacy.emailUpdates ? "Enabled" : "Disabled"}
                    </SettingsValue>
                  </SettingsCard>
                  <SettingsCard>
                    <SettingsIcon>
                      <MdVisibility size={24} />
                    </SettingsIcon>
                    <SettingsTitle>Discoverability</SettingsTitle>
                    <SettingsValue>
                      {userData.privacy.allowDiscoverability
                        ? "Enabled"
                        : "Disabled"}
                    </SettingsValue>
                  </SettingsCard>
                  <SettingsCard>
                    <SettingsIcon>
                      <MdMessage size={24} />
                    </SettingsIcon>
                    <SettingsTitle>Allow Messaging</SettingsTitle>
                    <SettingsValue>
                      {userData.privacy.allowMessaging ? "Enabled" : "Disabled"}
                    </SettingsValue>
                  </SettingsCard>
                  <SettingsCard>
                    <SettingsIcon>
                      {darkMode ? (
                        <BsFillLightbulbFill size={24} />
                      ) : (
                        <BsFillLightbulbOffFill size={24} />
                      )}
                    </SettingsIcon>
                    <SettingsTitle>Dark Mode</SettingsTitle>
                    <SettingsValue>
                      {darkMode ? "Enabled" : "Disabled"}
                    </SettingsValue>
                  </SettingsCard>
                </SettingsGrid>

                <AccountActions>
                  <h3>Account Management</h3>
                  <ActionButtons>
                    <ActionButton color="#f5a623">
                      <FaLock size={14} /> Change Password
                    </ActionButton>
                    <ActionButton color="#d0021b">
                      <FaTrash size={14} /> Deactivate Account
                    </ActionButton>
                  </ActionButtons>
                </AccountActions>
              </>
            )}
          </SectionCard>
        )}
      </TabContent>

      <ProfileFooter>
        <FooterQrCode>
          <FaQrcode size={40} />
          <span>Scan to view profile</span>
        </FooterQrCode>
        <FooterStats>
          <FooterStatItem>
            <span>Last updated:</span>
            <strong>Today at {new Date().toLocaleTimeString()}</strong>
          </FooterStatItem>
          <FooterStatItem>
            <span>Member since:</span>
            <strong>March 2021</strong>
          </FooterStatItem>
        </FooterStats>
      </ProfileFooter>
    </ProfileContainer>
  );
};

// Keyframe Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const progressAnimation = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

// Styled Components (remain the same as before, just updating the icon-related parts)
// ... [All the styled components remain exactly the same as in your original code]

export default ProfileSection;
