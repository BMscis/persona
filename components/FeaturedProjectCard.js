import React from "react";
import MockupToolbar from "./MockupToolbar";
import Button from "./Button";
import SourceButton from "./SourceButton";
import Image from "next/image";

import GitHub from "./icons/GitHub";
import ExternalLink from "./icons/ExternalLink";

const FeaturedProjectCard = ({
  title,
  status,
  float,
  flexDirection,
  description,
  imgWidth,
  imgHeight,
  imgSrc,
  stack,
  liveLink,
  repoLink,
}) => {
  return (
    <article
      className={`relative flex items-stretch w-full bg-mid p-3.5 my-4 ${flexDirection} rounded-md overflow-hidden gap-x-3.5`}
    >
      {/* Project image */}
      <div className="flex flex-col w-full lg:w-5/6 my-auto">
        {/* <MockupToolbar /> */}
        <Image
          src={imgSrc}
          width={imgWidth}
          height={imgHeight}
          alt={`${title} user interface`}
        />
      </div>

      {/* Project info */}
      <div
        className={`grow flex flex-col relative w-full p-3.5 lg:w-1/2 lg:${float} lg:-translate-x-0 gap-y-2`}
      >
        <p className={`mb-0 tracking-wider small-text ${status.includes('Mainnet') ? 'text-green-400' : 'text-yellow-200'}`}>{status}</p>
        <h3>{title}</h3>
        <div className="w-1/4 h-1 bg-brand mb-2">&nbsp;</div>
        <div className="flex flex-wrap mb-2">{stack}</div>
        <p className="text-sm tracking-wide leading-normal">{description}</p>
        <div className="flex">
          {liveLink !== null ? (
            <Button
              link={liveLink}
              text={"Live"}
              square={false}
              icon={<ExternalLink square={false} />}
            />
          ) : null}

          {repoLink !== null ? (
            <Button
              link={repoLink}
              text={"Source"}
              square={false}
              icon={<GitHub square={false} />}
            />
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default FeaturedProjectCard;
