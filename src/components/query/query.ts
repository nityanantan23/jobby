import gql from 'graphql-tag';
export const QUERY_LOCATION = gql`
  query Locations($input: LocationsInput!) {
    locations(input: $input) {
      id
      type
      name
      slug
      __typename
    }
  }
`;

export const QUERY_CITY = gql`
  query City($input: LocationInput!) {
    city(input: $input) {
      type
      name
      slug
      country {
        isoCode
        __typename
      }
      __typename
    }
  }
`;

export const QUERY_JOBS_FIRST = gql`
  query jobs {
    jobs {
      id
      title
      company {
        websiteUrl
      }
      cities {
        name
        country {
          name
        }
      }
      countries {
        name
      }
    }
  }
`;

export const QUERY_JOBS = gql`
  query Jobs($input: JobsInput) {
    jobs(input: $input) {
      ...JobBaseFragment
      __typename
    }
  }
  fragment JobBaseFragment on Job {
    id
    title
    slug
    description
    applyUrl
    postedAt
    isFeatured
    cities {
      ...CityFragment
      __typename
    }
    countries {
      ...CountryFragment
      __typename
    }
    remotes {
      ...RemoteFragment
      __typename
    }
    tags {
      ...TagFragment
      __typename
    }
    company {
      ...CompanyFragment
      __typename
    }
    commitment {
      ...CommitmentFragment
      __typename
    }
    __typename
  }
  fragment CityFragment on City {
    id
    name
    slug
    country {
      id
      name
      slug
      isoCode
      __typename
    }
    __typename
  }
  fragment CountryFragment on Country {
    id
    name
    slug
    __typename
  }
  fragment RemoteFragment on Remote {
    id
    name
    slug
    __typename
  }
  fragment TagFragment on Tag {
    id
    name
    slug
    __typename
  }
  fragment CompanyFragment on Company {
    id
    name
    logoUrl
    websiteUrl
    slug
    twitter
    __typename
  }
  fragment CommitmentFragment on Commitment {
    id
    title
    slug
    __typename
  }
`;

export const QUERY_JOBS_DETAILS = gql`
  query Job($input: JobInput!) {
    job(input: $input) {
      ...JobFullFragment
      __typename
    }
  }
  fragment JobFullFragment on Job {
    ...JobBaseFragment
    company {
      ...CompanyFragment
      jobs {
        ...JobBaseFragment
        __typename
      }
      __typename
    }
    __typename
  }
  fragment JobBaseFragment on Job {
    id
    title
    slug
    description
    applyUrl
    postedAt
    isFeatured
    cities {
      ...CityFragment
      __typename
    }
    countries {
      ...CountryFragment
      __typename
    }
    remotes {
      ...RemoteFragment
      __typename
    }
    tags {
      ...TagFragment
      __typename
    }
    company {
      ...CompanyFragment
      __typename
    }
    commitment {
      ...CommitmentFragment
      __typename
    }
    __typename
  }
  fragment CityFragment on City {
    id
    name
    slug
    country {
      id
      name
      slug
      isoCode
      __typename
    }
    __typename
  }
  fragment CountryFragment on Country {
    id
    name
    slug
    __typename
  }
  fragment RemoteFragment on Remote {
    id
    name
    slug
    __typename
  }
  fragment TagFragment on Tag {
    id
    name
    slug
    __typename
  }
  fragment CompanyFragment on Company {
    id
    name
    logoUrl
    websiteUrl
    slug
    twitter
    __typename
  }
  fragment CommitmentFragment on Commitment {
    id
    title
    slug
    __typename
  }
`;
