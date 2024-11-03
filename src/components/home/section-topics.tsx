import useQueryTopics from "@/hooks/api/topics/useQueryTopics";
import AlertError from "../shared/alert-error";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SectionTopics() {
  const { data, isLoading, isError } = useQueryTopics();

  if (isLoading)
    return (
      <div className="flex gap-2 px-5">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-8 w-full animate-pulse rounded-full bg-slate-200"
          ></div>
        ))}
      </div>
    );

  if (isError)
    return (
      <AlertError message="Gagal memuat data topik" containerClassName="px-5" />
    );

  if (!data) return;

  return (
    <section className="">
      <Swiper spaceBetween={10} slidesPerView={"auto"} freeMode={true}>
        {data.data.topics.map(({ id, name }, index) => (
          <SwiperSlide key={id} className="!w-auto">
            <div
              className={`select-none whitespace-nowrap rounded-full bg-white px-5 py-2 text-sm ${index === 0 && "ml-5"} ${index === data.data.topics.length - 1 && "mr-5"}`}
            >
              {name}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
