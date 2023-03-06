interface BoxProps {
  className?: string;
}

interface InfoProps {
  className?: string;
  label?: string;
  value?: string;
}

interface LinkProps extends InfoProps {
  href: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
}

interface ImageProps {
  className?: string;
  src: string;
}

interface HtmlEditorProps {
  className?: string;
  label?: string;
  value?: string;
}

interface IBoxComposition {
  Image: React.FC<ImageProps>;
  HtmlEditor: React.FC<HtmlEditorProps>;
  Items: React.FC;
  InfoItem: React.FC<InfoProps>;
  LongInfoItem: React.FC<InfoProps>;
  LinkItem: React.FC<LinkProps>;
}

export const infoBoxTestIds = {
  infoBox: "infoBox",
  infoBoxImage: "infoBoxImage",
  infoBoxItems: "infoBoxItems",
  infoBoxItem: "infoBoxItem",
  infoBoxLinkItem: "infoBoxLinkItem",
  infoBoxLink: "infoBoxLink",
  infoBoxCustomChild: "infoBoxCustomChild",
};

const Image: React.FC<ImageProps> = ({ className = "", src }) => (
  <div
    className={`h-36 w-36 flex-shrink-0 flex-grow rounded overflow-hidden order-1  md:flex-grow-0  ${className} `}
  >
    <img
      className="object-cover w-full h-full"
      src={src}
      alt=""
      data-testid={infoBoxTestIds.infoBoxImage}
    />
  </div>
);

const HtmlEditor: React.FC<HtmlEditorProps> = ({ 
  className = "",
  label = "",
  value = ""}) => {
    return (
      <div
        style={{ width: "100%" }}
        data-testid={infoBoxTestIds.infoBoxItem}
        className={`detailInfo block ${className} ${!label && "hidden 2xl:block"}`}
      >
        <span className="detailInfo__label capitalize-first">{label}</span>
        <span
          className="text-left block border-t border-dashed opacity-90"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
    );
  }

const Items: React.FC = ({ children }) => (
  <div
    data-testid={infoBoxTestIds.infoBoxItems}
    className="md:flex md:flex-wrap gap-1 w-full overflow-y-auto md:max-h-52 self-start max-w-7xl order-2"
  >
    {children}
  </div>
);

const InfoItem: React.FC<InfoProps> = ({
  className = "",
  label = "",
  value = "",
}) => {
  return (
    <div
      style={{ width: "25rem" }}
      data-testid={infoBoxTestIds.infoBoxItem}
      className={`detailInfo ${className} ${!label && "hidden 2xl:flex"}`}
    >
      <span className="detailInfo__label capitalize-first">{label}</span>
      <span className="flex-1 overflow-ellipsis overflow-hidden opacity-90 text-right whitespace-nowrap">
        {value}
      </span>
    </div>
  );
};

const LongInfoItem: React.FC<InfoProps> = ({
  className = "",
  label = "",
  value = "",
}) => {
  return (
    <div
      style={{ width: "25rem" }}
      data-testid={infoBoxTestIds.infoBoxItem}
      className={`detailInfo ${className} ${!label && "hidden 2xl:flex"}`}
    >
      <span className="detailInfo__label capitalize-first">{label}</span>
      <span
        style={{ fontSize: "11.5px" }}
        className="flex-1 overflow-ellipsis overflow-hidden opacity-90 text-right whitespace-nowrap"
      >
        {value}
      </span>
    </div>
  );
};

const LinkItem: React.FC<LinkProps> = ({
  className = "",
  label = "",
  value = "",
  href,
  target = "_self",
}) => {
  return (
    <div
      data-testid={infoBoxTestIds.infoBoxLinkItem}
      className={`${className} detailInfo `}
    >
      <span className="detailInfo__label capitalize-first">{label}</span>
      <span className="flex-1 basi overflow-ellipsis overflow-hidden underline opacity-90 text-right whitespace-nowrap">
        <a data-testid={infoBoxTestIds.infoBoxLink} href={href} target={target}>
          {value}
        </a>
      </span>
    </div>
  );
};

const InfoBox: React.FC<BoxProps> & IBoxComposition = ({
  children,
  className = "",
}) => {
  return (
    <section
      data-testid={infoBoxTestIds.infoBox}
      className={`flex flex-wrap md:flex-nowrap gap-2 w-full text-sm lg:text-sm font-light ${className}`}
    >
      {children}
    </section>
  );
};

InfoBox.Items = Items;
InfoBox.InfoItem = InfoItem;
InfoBox.LongInfoItem = LongInfoItem;
InfoBox.LinkItem = LinkItem;
InfoBox.Image = Image;
InfoBox.HtmlEditor = HtmlEditor;

export default InfoBox;
