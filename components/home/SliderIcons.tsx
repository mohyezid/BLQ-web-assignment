import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  PromiseLikeOfReactNode,
  Key,
} from "react";

const SliderIcons = ({ shortcuts }: any) => {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {shortcuts.map(
        (
          shortcut: {
            linkUrl: string | undefined;
            imageUrl: string | undefined;
            title:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | PromiseLikeOfReactNode
              | null
              | undefined;
          },
          index: Key | null | undefined
        ) => (
          <a
            key={index}
            href={shortcut.linkUrl}
            className="flex flex-col items-center mx-2"
          >
            <img src={shortcut.imageUrl} alt={""} className="w-12 h-12" />
            <p className="text-center mt-2">{shortcut.title}</p>
          </a>
        )
      )}
    </div>
  );
};

export default SliderIcons;
