"use client";

import { useQuery } from "@apollo/client";
import { cleanCookie } from "@repo/global-functions/Cookie/cleanCookie";
import { Button, LoadingSpinner } from "@repo/ui";
import React from "react";
import { GET_MYPUBLICATIONS_QUERY } from "../../../queries/getMyPublicationsQuery";

export default function Dashboard() {
  const { loading, error, data } = useQuery(GET_MYPUBLICATIONS_QUERY);
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {loading ? <LoadingSpinner /> : null}

      {data && (
        <ul>
          {data.myPublications.map((publication: any) => (
            <li key={publication.publicationId}>
              {publication.publicationName}
            </li>
          ))}
        </ul>
      )}
      <Button theme="primary" onClick={() => cleanCookie()}>
        Back to Dashboard
      </Button>
    </div>
  );
}
