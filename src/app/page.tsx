import type { Metadata } from "next";
import "./home.css";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, MapPin } from "lucide-react";
import Image from "@/components/ui/Img";
import { Header, Footer } from "@/components/landing";
import { ZaloWidget } from "@/components/ui";
import { PrintShowcase } from "@/components/home/PrintShowcase";
import { HomeExperience } from "@/components/home/HomeExperience";
import { FAQSection } from "@/components/home/FAQSection";
import { BUSINESS } from "@/lib/business";
import { SERVICES } from "@/lib/navigation";
import { getCaseStudyBySlug, coverImage } from "@/lib/portfolio";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: { absolute: "In 3D theo yêu cầu tại TP.HCM | Tiệm 3D" },
  alternates: { canonical: BUSINESS.url + "/" },
};

const sampleSlugs = ["figure-anime-resin-8k", "mu-iron-man-mk85", "banh-rang-thay-the"];
const labels = ["Figure resin", "Đồ cosplay", "Chi tiết máy"];
const samples = sampleSlugs.flatMap((slug, index) => {
  const study = getCaseStudyBySlug(slug);
  return study ? [{ title: study.shortTitle, label: labels[index], image: coverImage(study), href: "/portfolio/" + slug + "/" }] : [];
});

const process = [
  { title: "Kể ý tưởng", text: "Gửi ảnh, file 3D hoặc mô tả món đồ. Cho chúng tôi biết kích thước, số lượng và thời gian bạn cần." },
  { title: "Chốt cách làm & chi phí", text: "Cùng chọn vật liệu, xem phương án thiết kế và xác nhận báo giá trước khi sản xuất." },
  { title: "In & hoàn thiện", text: "In theo thông số đã thống nhất, xử lý bề mặt và sơn màu nếu bạn có yêu cầu." },
  { title: "Nhận sản phẩm", text: "Sản phẩm được kiểm tra, đóng gói và bàn giao cho đơn vị vận chuyển. Trao đổi tiến độ qua Zalo." },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <HomeExperience>
      <Header variant="studio" />
      <main id="noi-dung" className="studio-home">
        <section className="home-hero">
          <div className="hero-build-grid" aria-hidden="true" />
          <div className="site-container hero-layout">
            <div className="hero-intro">
              <p className="hero-location"><span aria-hidden="true" />In 3D & thiết kế theo yêu cầu tại TP.HCM</p>
              <h1>Ý tưởng của bạn.<br />Thành hình với <span className="hero-keep">in 3D.</span></h1>
            </div>
            <PrintShowcase samples={samples} />
            <div className="hero-copy">
              <p className="hero-description">Gửi ảnh hoặc file 3D. Tiệm tư vấn vật liệu, dựng mẫu, in và hoàn thiện theo yêu cầu của bạn.</p>
              <div className="hero-actions">
                <Link href="/bao-gia/" className="action-primary">Nhận tư vấn & báo giá<ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
                <Link href="/portfolio/" className="action-secondary">Xem mẫu in<ArrowUpRight className="h-5 w-5" aria-hidden="true" /></Link>
              </div>
              <ul className="hero-assurances">
                <li><Check aria-hidden="true" />Chưa có file 3D vẫn có thể bắt đầu</li>
                <li><Check aria-hidden="true" />Thống nhất chi phí trước khi in</li>
              </ul>
              <p className="hero-areas">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <Link href="/khu-vuc/tan-phu/">Tân Phú</Link>
                <span aria-hidden="true">/</span>
                <Link href="/khu-vuc/thu-duc/">Thủ Đức</Link>
                <span>Giao hàng toàn quốc</span>
              </p>
            </div>
          </div>
          <div className="site-container hero-footer"><span>Từ ảnh tham khảo đến sản phẩm của riêng bạn.</span><a href="#services-heading">Khám phá cách Tiệm làm<ArrowDown aria-hidden="true" /></a></div>
        </section>

        <div className="studio-ribbon" data-scroll="ribbon" aria-hidden="true"><div data-scroll-art><span>Thiết kế.</span><span>In 3D.</span><span>Hoàn thiện.</span><span>Thành hình.</span></div></div>

        <section className="home-section services-section" aria-labelledby="services-heading">
          <div className="site-container">
            <div className="section-intro">
              <div><h2 id="services-heading">Chọn cách in.<br />Đúng với món đồ bạn cần.</h2></div>
              <p>Độ bền, độ mịn hay chi phí? Mỗi công nghệ có một thế mạnh. Chúng tôi tư vấn dựa trên cách bạn sẽ sử dụng sản phẩm.</p>
            </div>
            <div className="service-feature-grid">
              {[
                { title: "FDM", description: "Cho chi tiết sử dụng hằng ngày, đồ gá, prototype và mô hình lớn. Nhiều lựa chọn từ PLA, PETG đến nhựa kỹ thuật.", image: "/assets/generated/services/service-fdm-hero.webp", href: "/dich-vu/in-fdm/", detail: "Nhựa sợi · Đa dụng" },
                { title: "Resin", description: "Cho figure, mô hình trưng bày và các chi tiết cần bề mặt mịn. Phù hợp khi hình dáng nhỏ và đường nét là ưu tiên.", image: "/assets/generated/services/service-resin-hero.webp", href: "/dich-vu/in-resin/", detail: "Nhựa quang hóa · Chi tiết" },
              ].map((service) => (
                <Link key={service.href} href={service.href} className={"service-feature service-" + service.title.toLowerCase()}>
                  <div className="service-art" data-reveal>
                    <Image src={service.image} alt={"Minh họa công nghệ in " + service.title} fill sizes="(max-width: 767px) 100vw, 600px" className="object-cover" />
                    <span className="service-art-name" aria-hidden="true">{service.title}</span>
                    <span className="service-art-arrow"><ArrowUpRight aria-hidden="true" /></span>
                  </div>
                  <div className="service-feature-copy">
                    <p className="service-detail">{service.detail}</p>
                    <h3>In {service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="service-links">
              {SERVICES.slice(2).map((service) => <Link key={service.href} href={service.href}>{service.name}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>)}
            </div>
          </div>
        </section>

        <section className="home-section examples-section" aria-labelledby="examples-heading">
          <div className="site-container">
            <div className="section-intro">
              <h2 id="examples-heading">Một vài cách<br />biến ý tưởng thành hình.</h2>
              <div><p>Mẫu minh họa giúp bạn hình dung công nghệ, vật liệu và mức hoàn thiện phù hợp trước khi đặt làm.</p><Link href="/portfolio/" className="section-text-link">Khám phá mẫu & quy trình<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
            </div>
            <div className="sample-gallery">
              {samples.map((sample, index) => <Link key={sample.href} href={sample.href} className={"sample-card sample-card-" + index}>
                <div className="sample-art" data-reveal><Image src={sample.image} alt={sample.title + " — mẫu minh họa"} fill sizes="(max-width: 767px) 100vw, 600px" className="object-cover" /><span className="sample-view">Xem cách làm<ArrowUpRight aria-hidden="true" /></span></div>
                <div className="sample-caption"><div><p>{sample.label}</p><h3>{sample.title}</h3></div><ArrowUpRight className="h-6 w-6 shrink-0" aria-hidden="true" /></div>
              </Link>)}
            </div>
          </div>
        </section>

        <section className="home-section process-section" aria-labelledby="process-heading" data-scroll="process">
          <div className="site-container">
            <div className="section-intro">
              <h2 id="process-heading">Bạn nói điều mình cần.<br />Tiệm lo phần còn lại.</h2>
              <p className="!text-zinc-300">Không cần biết thuật ngữ kỹ thuật. Chỉ cần bắt đầu từ món đồ, ảnh tham khảo hoặc vấn đề bạn muốn giải quyết.</p>
            </div>
            <div className="process-track" aria-hidden="true"><span data-scroll-art /></div>
            <ol className="process-grid">
              {process.map((step, index) => <li key={step.title}>
                <span className="process-number" aria-hidden="true">0{index + 1}</span>
                <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{step.text}</p>
              </li>)}
            </ol>
            <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-white/20 pt-8">
              <Link href="/bao-gia/" className="action-primary">Bắt đầu yêu cầu của bạn<ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
              <Link href="/bang-gia/" className="inline-flex min-h-11 items-center font-semibold text-white underline underline-offset-4">Tham khảo bảng giá</Link>
            </div>
          </div>
        </section>

        <section className="home-section locations-section" aria-labelledby="locations-heading">
          <div className="site-container">
            <div className="section-intro">
              <h2 id="locations-heading">Ở TP.HCM.<br />Nhận yêu cầu từ mọi nơi.</h2>
              <p>Trao đổi qua Zalo, xem phương án trước khi in và nhận hàng qua đơn vị vận chuyển. Chọn khu vực để xem cách liên hệ phù hợp.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {BUSINESS.branches.map((branch) => <Link key={branch.id} href={"/khu-vuc/" + branch.id + "/"} className="location-link">
                <div><h3>{branch.shortName}</h3><p>{branch.customerVisits ? "Liên hệ trước để được hướng dẫn nhận mẫu và trao đổi." : "Xưởng nhận đơn online. Không tiếp khách trực tiếp."}</p></div><ArrowUpRight className="h-6 w-6 shrink-0" aria-hidden="true" />
              </Link>)}
            </div>
          </div>
        </section>

        <FAQSection />

        <section className="home-section guides-section" aria-labelledby="guides-heading">
          <div className="site-container">
            <div className="section-intro"><h2 id="guides-heading">Tìm hiểu trước khi in.</h2><Link href="/blog/" className="section-text-link">Tất cả bài hướng dẫn<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
            <div className="grid gap-8 md:grid-cols-3">
              {posts.map((post) => <article key={post.slug} className="guide-card">
                <Link href={post.url} className="group">
                  {post.image && <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-lg bg-zinc-100"><Image src={post.image} alt="" fill sizes="(max-width: 767px) 100vw, 400px" className="object-cover" /></div>}
                  <h3 className="text-lg font-semibold leading-relaxed text-zinc-950 group-hover:text-[#a83e08]">{post.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600">{post.description}</p>
                </Link>
              </article>)}
            </div>
          </div>
        </section>

        <section className="studio-invitation" aria-labelledby="invitation-heading" data-scroll="layers">
          <div className="site-container invitation-layout">
            <div className="invitation-copy"><h2 id="invitation-heading">Bạn đang muốn<br />in món gì?</h2><p>Một mô hình bạn thích. Một chi tiết khó tìm. Hay một ý tưởng chưa ai làm. Kể cho Tiệm nghe.</p><Link href="/bao-gia/" className="action-dark">Gửi ý tưởng cho Tiệm<ArrowUpRight aria-hidden="true" /></Link></div>
            <div className="invitation-sculpture" aria-hidden="true"><svg viewBox="0 0 480 480" fill="none" data-scroll-art>{Array.from({ length: 26 }, (_, index) => <ellipse key={index} cx={240 + Math.sin(index * 0.14) * 40} cy={95 + index * 10.5} rx={95 + Math.cos(index * 0.22) * 48} ry={38 + Math.cos(index * 0.22) * 18} stroke="currentColor" strokeWidth="1.5" />)}</svg></div>
          </div>
        </section>
      </main>
      <Footer />
      <ZaloWidget />
    </HomeExperience>
  );
}
