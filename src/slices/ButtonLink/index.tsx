import Button from "@/components/Button";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ButtonLink`.
 */
export type ButtonLinkProps = SliceComponentProps<Content.ButtonLinkSlice>;

/**
 * Component for "ButtonLink" Slices.
 */
const ButtonLink = ({ slice }: ButtonLinkProps): JSX.Element => {
  return (
    <div className="inline-flex gap-4 mr-3">
      <Button
        linkField={slice.primary.project_link}
        label={slice.primary.button_text}
      />
    </div>
  );
};

export default ButtonLink;
