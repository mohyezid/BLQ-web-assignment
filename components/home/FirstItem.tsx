"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
interface MediaItem {
  uuid: string;
  uri: string;
}

interface PriceInfo {
  discountRate: number;
  price: number;
}

interface Publication {
  media: MediaItem[];
  productName: string;
  priceInfo: PriceInfo;
  rating: number;
}
interface FirstItem {
  publication: any;
  items: {
    publication: Publication;
  }[];
}

interface Item {
  publication: any;
  id: string;
  items: {
    publication: Publication;
  }[];
  title: string;
  type: string;
  viewType: string;
}
const FirstItem = () => {
  const [firstItem, setFirstItem] = useState<FirstItem[]>([]);
  const [otherItems, setOtherItems] = useState<Item[][]>([]);
  const [first, setFirst] = useState<Item | null>(null);
  const [other, setOther] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.testvalley.kr/collections?prearrangedDiscount"
        );
        const itemsData = response.data.items;

        // Filter items with type "SINGLE" and viewType "TILE"
        const filteredItems = itemsData.filter(
          (item: { type: string; viewType: string }) =>
            item.type === "SINGLE" && item.viewType === "TILE"
        );
        console.log(filteredItems[0]);
        // Extract first item
        if (filteredItems.length > 0) {
          setFirstItem(filteredItems[0].items);
          setFirst(filteredItems[0]);
        }
        if (filteredItems.length > 1) {
          setOther(filteredItems.slice(1).map((item: any) => item));
        }
        // Extract other items
        if (filteredItems.length > 1) {
          setOtherItems(
            filteredItems.slice(1).map((item: { items: any }) => item.items)
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!firstItem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Rendering the first item */}
      <div className="flex flex-wrap justify-between gap-8 mt-4 overflow-x-auto">
        <div className="flex  items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12 mt-4">
          <div className="flex flex-col mt-4 mr-4 gap-2 bg-background/50 border border-primary/10 rounded-lg h-[400px]">
            <h3 className="mt-2 text-lg font-semibold">{first?.title}</h3>
          </div>
          {firstItem.map((mediaItem) =>
            mediaItem.publication.media.map(
              (media: {
                uuid: React.Key | null | undefined;
                uri: string | StaticImport;
              }) => (
                <div
                  key={media.uuid}
                  className="flex flex-col mt-4 mr-4 gap-2 bg-background/50 border border-primary/10 rounded-lg h-[400px]"
                >
                  <div className="flex-1 aspect-square overflow-hidden relative w-full relative w-full h-[210px] rounded-s-lg">
                    <Image fill src={media.uri} alt="" />
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">
                    {mediaItem.publication.productName}
                  </h3>
                  <p className="text-sm">
                    {mediaItem.publication.priceInfo.discountRate && (
                      <span className="text-red-400">
                        {mediaItem.publication.priceInfo.discountRate}%
                      </span>
                    )}
                    {mediaItem.publication.priceInfo.price}
                  </p>
                  <div className="flex justify-start mt-1">
                    <span className="text-yellow-400 mr-1">{"★"}</span>
                    <span className="text-gray-500">{`${mediaItem.publication.rating}`}</span>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>

      {/* Rendering other items */}
      <div className="flex flex-wrap  gap-8 mt-4">
        {otherItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-center items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12 mt-4"
          >
            <div className="flex flex-col mt-4 mr-4 gap-2 bg-background/50 border border-primary/10 rounded-lg w-auto h-[400px]">
              <h3 className="mt-2 text-lg font-semibold">
                {other[index].title}
              </h3>
            </div>
            {item.map((mediaItem) =>
              mediaItem.publication.media.map(
                (media: {
                  uuid: React.Key | null | undefined;
                  uri: string | StaticImport;
                }) => (
                  <div
                    key={media.uuid}
                    className="flex flex-col mt-4 mr-4 gap-2 bg-background/50 border border-primary/10 rounded-lg h-[400px]"
                  >
                    <div className="flex-1 aspect-square overflow-hidden relative w-full relative w-full h-[210px] rounded-s-lg">
                      <Image fill src={media.uri} alt="" />
                    </div>
                    <h3 className="mt-2 text-lg font-semibold">
                      {mediaItem.publication.productName}
                    </h3>
                    <p className="text-sm">
                      {mediaItem.publication.priceInfo.discountRate && (
                        <span className="text-red-400">
                          {mediaItem.publication.priceInfo.discountRate}%
                        </span>
                      )}
                      {mediaItem.publication.priceInfo.price}
                    </p>
                    <div className="flex justify-start mt-1">
                      <span className="text-yellow-400 mr-1">{"★"}</span>
                      <span className="text-gray-500">{`${mediaItem.publication.rating}`}</span>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirstItem;
