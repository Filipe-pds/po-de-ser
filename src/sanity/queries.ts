import { defineQuery } from "next-sanity";

export const OPPORTUNITIES_QUERY = defineQuery(`
  *[_type == "opportunity"] | order(publishDate desc) {
    _id,
    title,
    slug,
    thumbnail,
    summary,
    summaryEn,
    kind,
    country,
    countryEn,
    city,
    participantSpots,
    ageMin,
    ageMax,
    showMembershipNote,
    projectStartDate,
    projectEndDate,
    publishDate,
    applicationDeadline,
    archiveAfterDays,
    statusMode,
    featured,
    infopackUrl,
    applicationUrl,
    instagramUrl
  }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(coalesce(startDate, year) desc) {
    _id,
    title,
    slug,
    coverImage,
    summary,
    summaryEn,
    kind,
    status,
    country,
    countryEn,
    city,
    startDate,
    endDate,
    year,
    featured,
    mainInfoUrl
  }
`);