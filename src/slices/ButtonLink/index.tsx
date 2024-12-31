import Bounded from "@/components/Bounded";
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
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex flex-wrap gap-4">
      <Button linkField={slice.primary.project_link} label={slice.primary.button_text}></Button>
      </div>

    </Bounded>
  );
};

export default ButtonLink;
