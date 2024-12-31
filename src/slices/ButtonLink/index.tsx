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
      <div className="grid gap-x-8 gap-y-6 md:grid-cols[2fr,1fr]">
      <Button linkField={slice.primary.project_link} label={slice.primary.button_text}></Button>
      </div>

    </Bounded>
  );
};

export default ButtonLink;
