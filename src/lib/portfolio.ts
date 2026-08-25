/**
 * Portfolio case studies.
 *
 * Each study follows the shop's real workflow — a customer sends a photo over
 * Zalo, the model gets built, printed, finished and shipped. That sequence is
 * far more persuasive than a grid of product shots, and the images for it
 * already existed in public/assets/generated/projects/ referenced by nothing.
 *
 * `imageDir` maps to that folder; `steps[].file` to a file inside it.
 */

export type CaseStudyCategory =
  | "decoration"
  | "figure"
  | "cosplay"
  | "mechanical"
  | "business";

export const CATEGORY_LABELS: Record<CaseStudyCategory, string> = {
  decoration: "Trang trí",
  figure: "Mô hình & Figure",
  cosplay: "Cosplay",
  mechanical: "Cơ khí",
  business: "Doanh nghiệp",
};

export interface CaseStudyStep {
  /** File name inside imageDir, without extension. */
  file: string;
  /** Short stage label, e.g. "Khách gửi Zalo". */
  stage: string;
  /** One or two sentences describing what happens at this stage. */
  caption: string;
}

export interface CaseStudySpec {
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  /** Card headline — shorter than the title. */
  shortTitle: string;
  category: CaseStudyCategory;
  /** Meta description and card copy. */
  description: string;
  /** What the customer asked for, in their words. */
  brief: string;
  /** The hard part of the job. */
  challenge: string;
  /** How the shop solved it. */
  solution: string;
  specs: CaseStudySpec[];
  /** Service page slugs this job used, in order. */
  services: string[];
  imageDir: string;
  steps: CaseStudyStep[];
  featured?: boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "tuong-phat-a-di-da",
    title: "Tượng Phật A Di Đà cao 60cm từ một tấm ảnh mờ",
    shortTitle: "Tượng Phật A Di Đà",
    category: "decoration",
    description:
      "Khách gửi một tấm ảnh chụp lại từ điện thoại, muốn có tượng Phật cao 60cm đặt ở phòng thờ. Chúng tôi dựng lại mẫu 3D, in FDM chia khối và sơn hiệu ứng đồng.",
    brief:
      "Một tấm ảnh chụp màn hình, hơi mờ, và yêu cầu: “Làm được tượng như này cao 60 phân không em?”. Không có file, không có bản vẽ.",
    challenge:
      "Ảnh tham khảo chỉ thấy mặt trước, nên phần lưng và tà áo phải dựng lại hoàn toàn theo tỉ lệ. 60cm vượt khổ in một lần, buộc phải chia khối và giấu đường ghép vào nếp áo.",
    solution:
      "Dựng model trong Blender, chia làm 6 khối theo nếp áo tự nhiên, in PLA với thành dày 2.4mm cho đủ cứng, dán ghép rồi bả matit và chà mịn trước khi phun sơn hiệu ứng đồng cổ.",
    specs: [
      { label: "Chiều cao", value: "60 cm" },
      { label: "Vật liệu", value: "PLA, sơn phủ đồng" },
      { label: "Số khối in", value: "6 khối" },
      { label: "Thời gian", value: "9 ngày" },
    ],
    services: ["thiet-ke-3d", "in-fdm", "in-kho-lon", "hoan-thien"],
    imageDir: "tuong-phat",
    featured: true,
    steps: [
      {
        file: "phat-01-zalo",
        stage: "Khách gửi Zalo",
        caption:
          "Ảnh tham khảo duy nhất khách có — chụp lại từ màn hình, chỉ nhìn rõ mặt trước.",
      },
      {
        file: "phat-02-blender",
        stage: "Dựng mẫu 3D",
        caption:
          "Dựng lại toàn bộ tượng trong Blender theo tỉ lệ người thật, bổ sung phần lưng và tà áo mà ảnh không có.",
      },
      {
        file: "phat-03-printing",
        stage: "In 3D",
        caption:
          "Chia 6 khối và in song song trên nhiều máy FDM để rút ngắn thời gian xuống còn 4 ngày.",
      },
      {
        file: "phat-04-painting",
        stage: "Sơn hoàn thiện",
        caption:
          "Bả matit các đường ghép, chà mịn rồi phun nền và đánh hiệu ứng đồng cổ ở các nếp áo.",
      },
      {
        file: "phat-05-display",
        stage: "Thành phẩm",
        caption: "Tượng hoàn thiện, bề mặt không còn thấy vân in hay đường ghép.",
      },
      {
        file: "phat-06-shipping",
        stage: "Đóng gói & giao",
        caption: "Bọc mút từng khối, đóng thùng gỗ và giao tận nơi trong TP.HCM.",
      },
    ],
  },

  {
    slug: "mu-iron-man-mk85",
    title: "Mũ Iron Man MK85 đội được, sơn hiệu ứng kim loại",
    shortTitle: "Mũ Iron Man MK85",
    category: "cosplay",
    description:
      "Một bạn cosplayer gửi ảnh từ Google, cần mũ Iron Man đội vừa đầu, sơn đỏ vàng hiệu ứng kim loại kịp ngày chụp hình.",
    brief:
      "“Em cần mũ Iron Man đội được, sơn đẹp như phim, khoảng 2 tuần nữa em chụp hình.”",
    challenge:
      "Mũ phải vừa đầu người thật nên cần đo và scale chính xác, đồng thời chia mảnh sao cho lắp lại vẫn kín và phần mặt nạ mở lên được.",
    solution:
      "Dựng model theo số đo vòng đầu của khách, chia 5 mảnh in FDM, chà nhám 3 lượt rồi phun nền đen, phủ chrome và phủ candy đỏ để ra hiệu ứng kim loại thật.",
    specs: [
      { label: "Kích thước", value: "Vừa vòng đầu 58cm" },
      { label: "Vật liệu", value: "PLA, sơn chrome + candy" },
      { label: "Số mảnh", value: "5 mảnh" },
      { label: "Thời gian", value: "11 ngày" },
    ],
    services: ["thiet-ke-3d", "in-kho-lon", "hoan-thien"],
    imageDir: "iron-man-helmet",
    featured: true,
    steps: [
      {
        file: "ironman-01-zalo",
        stage: "Khách gửi Zalo",
        caption: "Ảnh tham khảo lấy từ Google, kèm số đo vòng đầu khách tự đo.",
      },
      {
        file: "ironman-02-blender",
        stage: "Dựng mẫu 3D",
        caption:
          "Scale model theo vòng đầu thật, chia mảnh và thêm khớp để mặt nạ mở lên được.",
      },
      {
        file: "ironman-03-printing",
        stage: "In 3D",
        caption: "In PLA lớp 0.16mm — đủ mịn để rút ngắn công chà nhám phía sau.",
      },
      {
        file: "ironman-04-painting",
        stage: "Sơn hoàn thiện",
        caption:
          "Chà nhám 3 lượt, phun nền đen bóng, phủ chrome rồi phủ candy đỏ cho ra ánh kim loại.",
      },
      {
        file: "ironman-05-display",
        stage: "Thành phẩm",
        caption: "Mũ hoàn thiện, đội vừa và mặt nạ đóng mở êm.",
      },
      {
        file: "ironman-06-shipping",
        stage: "Đóng gói & giao",
        caption: "Chèn mút kín trong thùng, ship COD toàn quốc.",
      },
    ],
  },

  {
    slug: "gia-do-dien-thoai-tu-ban-ve-tay",
    title: "Giá đỡ điện thoại đi từ bản vẽ tay ra sản phẩm",
    shortTitle: "Giá đỡ điện thoại",
    category: "mechanical",
    description:
      "Khách phác thảo trên giấy một giá đỡ điện thoại có chỗ luồn dây sạc. Chúng tôi dựng CAD, in thử, chỉnh góc rồi in bản cuối.",
    brief:
      "Một bản vẽ tay trên giấy kẻ ô, kèm ghi chú “góc nghiêng thoải hơn chút” và “có lỗ luồn dây sạc”.",
    challenge:
      "Bản vẽ tay không có kích thước chuẩn. Góc nghiêng đầu tiên quá dựng, điện thoại bị trượt khi chạm màn hình.",
    solution:
      "Dựng CAD trong Fusion 360, in bản mẫu, ngồi thử với chính điện thoại của khách rồi hạ góc từ 70° xuống 62° và thêm gờ chặn cao 4mm.",
    specs: [
      { label: "Kích thước", value: "90 × 80 × 110 mm" },
      { label: "Vật liệu", value: "PETG" },
      { label: "Số lần thử", value: "2 bản mẫu" },
      { label: "Thời gian", value: "3 ngày" },
    ],
    services: ["thiet-ke-3d", "in-ky-thuat", "in-fdm"],
    imageDir: "phone-stand",
    steps: [
      {
        file: "stand-01-zalo",
        stage: "Khách gửi Zalo",
        caption: "Bản vẽ tay trên giấy kẻ ô, chụp bằng điện thoại.",
      },
      {
        file: "stand-02-fusion",
        stage: "Dựng CAD",
        caption:
          "Dựng lại trong Fusion 360 với kích thước thật, thêm lỗ luồn dây sạc theo yêu cầu.",
      },
      {
        file: "stand-03-printing",
        stage: "In 3D",
        caption: "In PETG để chịu được nhiệt trong xe và không giòn như PLA.",
      },
      {
        file: "stand-04-display",
        stage: "Thành phẩm",
        caption:
          "Bản cuối sau khi hạ góc nghiêng và thêm gờ chặn — điện thoại không còn trượt.",
      },
      {
        file: "stand-05-shipping",
        stage: "Đóng gói & giao",
        caption: "Đóng gói nhỏ gọn, ship trong ngày ở nội thành.",
      },
    ],
  },

  {
    slug: "figure-anime-resin-8k",
    title: "Figure anime in Resin 8K, sơn tay từng chi tiết",
    shortTitle: "Figure anime Resin 8K",
    category: "figure",
    description:
      "Khách sưu tầm gửi file STL tải trên mạng, muốn figure cao 18cm in Resin 8K và sơn tay hoàn thiện như bản thương mại.",
    brief:
      "“Em có file rồi, in giúp em cao 18cm, sơn màu giống ảnh mẫu được không?”",
    challenge:
      "File tải về ở dạng nguyên khối, không chia mảnh và không có chốt ghép — in nguyên con sẽ để lại vết support ngay trên mặt nhân vật.",
    solution:
      "Chia file thành 7 mảnh theo đường tự nhiên của trang phục, đặt support toàn bộ vào mặt khuất, in Resin 8K lớp 0.03mm rồi sơn airbrush kết hợp cọ tay cho phần mắt.",
    specs: [
      { label: "Chiều cao", value: "18 cm" },
      { label: "Công nghệ", value: "Resin 8K, lớp 0.03mm" },
      { label: "Số mảnh", value: "7 mảnh" },
      { label: "Thời gian", value: "8 ngày" },
    ],
    services: ["in-resin", "hoan-thien"],
    imageDir: "anime-figure",
    featured: true,
    steps: [
      {
        file: "anime-01-zalo",
        stage: "Khách gửi Zalo",
        caption: "Khách gửi sẵn file STL kèm ảnh màu tham khảo.",
      },
      {
        file: "anime-02-zbrush",
        stage: "Chia mảnh & kê support",
        caption:
          "Chia 7 mảnh theo nếp trang phục và dời toàn bộ điểm support sang mặt khuất.",
      },
      {
        file: "anime-03-resin",
        stage: "In Resin 8K",
        caption: "In lớp 0.03mm, rửa cồn và sấy UV đúng thời gian để không giòn.",
      },
      {
        file: "anime-04-painting",
        stage: "Sơn hoàn thiện",
        caption: "Phun nền airbrush, đi bóng tối và vẽ tay phần mắt bằng cọ nhỏ.",
      },
      {
        file: "anime-05-display",
        stage: "Thành phẩm",
        caption: "Figure hoàn thiện trên đế trưng bày, không thấy vết ghép.",
      },
      {
        file: "anime-06-shipping",
        stage: "Đóng gói & giao",
        caption: "Mỗi chi tiết mảnh được bọc riêng trước khi vào hộp.",
      },
    ],
  },

  {
    slug: "rong-trang-tri-tet",
    title: "Rồng trang trí 80cm cho sảnh quán cà phê dịp Tết",
    shortTitle: "Rồng trang trí 80cm",
    category: "decoration",
    description:
      "Quán cà phê cần một mô hình rồng dài 80cm đặt ở sảnh dịp Tết, sơn nhũ vàng, lắp ráp được để cất sau mùa.",
    brief:
      "Chủ quán gửi ảnh vài mẫu rồng trên Pinterest, cần xong trước 20 tháng Chạp.",
    challenge:
      "Thân rồng dài và cong, không khối nào in nguyên được. Quán cũng cần tháo rời để cất sau Tết nên các mối nối phải lắp lại được nhiều lần.",
    solution:
      "Chia thân thành 9 đốt nối bằng chốt âm dương, in PLA rỗng ruột để nhẹ, sơn nền nâu rồi đánh nhũ vàng ở vảy để bắt sáng đèn sảnh.",
    specs: [
      { label: "Chiều dài", value: "80 cm" },
      { label: "Vật liệu", value: "PLA, sơn nhũ vàng" },
      { label: "Số đốt", value: "9 đốt tháo rời" },
      { label: "Thời gian", value: "12 ngày" },
    ],
    services: ["thiet-ke-3d", "in-kho-lon", "hoan-thien"],
    imageDir: "rong-trang-tri",
    steps: [
      {
        file: "rong-01-zalo",
        stage: "Khách gửi Zalo",
        caption: "Ảnh tham khảo từ Pinterest và kích thước sảnh quán.",
      },
      {
        file: "rong-02-blender",
        stage: "Dựng mẫu 3D",
        caption: "Dựng thân rồng theo đường cong sảnh, chia 9 đốt có chốt âm dương.",
      },
      {
        file: "rong-03-printing",
        stage: "In 3D",
        caption: "In rỗng ruột để tổng khối lượng dưới 3kg, treo và bê đều dễ.",
      },
      {
        file: "rong-04-painting",
        stage: "Sơn hoàn thiện",
        caption: "Sơn nền nâu, đánh nhũ vàng từng vảy để bắt sáng đèn vàng của quán.",
      },
      {
        file: "rong-05-display",
        stage: "Thành phẩm",
        caption: "Rồng lắp hoàn chỉnh, tháo rời cất gọn sau mùa Tết.",
      },
      {
        file: "rong-06-shipping",
        stage: "Đóng gói & giao",
        caption: "Giao theo từng đốt kèm hướng dẫn lắp có đánh số.",
      },
    ],
  },

  {
    slug: "mascot-cua-hang",
    title: "Linh vật thương hiệu: 30 tượng nhỏ cho chuỗi cửa hàng",
    shortTitle: "Linh vật thương hiệu",
    category: "business",
    description:
      "Một thương hiệu đồ uống cần 30 tượng linh vật cao 12cm đặt ở quầy các chi nhánh, đồng đều màu và đúng nhận diện.",
    brief:
      "Brand guideline dạng PDF, một hình linh vật 2D, và yêu cầu 30 bản giống hệt nhau.",
    challenge:
      "Linh vật chỉ có bản vẽ 2D nhìn chính diện. Với 30 bản, mọi sai lệch màu giữa các lô sẽ lộ ngay khi đặt cạnh nhau ở các chi nhánh.",
    solution:
      "Dựng khối 3D từ bản vẽ 2D và duyệt mẫu với khách trước, in hàng loạt trên nhiều máy cùng lô nhựa, pha sơn một mẻ duy nhất cho cả 30 bản.",
    specs: [
      { label: "Chiều cao", value: "12 cm" },
      { label: "Số lượng", value: "30 bản" },
      { label: "Vật liệu", value: "PLA, sơn theo mã màu brand" },
      { label: "Thời gian", value: "14 ngày" },
    ],
    services: ["thiet-ke-3d", "in-hang-loat", "hoan-thien", "du-an-tron-goi"],
    imageDir: "mascot-cua-hang",
    steps: [
      {
        file: "mascot-01-zalo",
        stage: "Khách gửi Zalo",
        caption: "Brand guideline và hình linh vật 2D nhìn chính diện.",
      },
      {
        file: "mascot-02-blender",
        stage: "Dựng mẫu 3D",
        caption: "Dựng khối 3D từ bản vẽ 2D, gửi render duyệt trước khi in loạt.",
      },
      {
        file: "mascot-03-printing",
        stage: "In hàng loạt",
        caption: "Chạy nhiều máy song song, cùng một lô nhựa để màu nền đồng đều.",
      },
      {
        file: "mascot-04-painting",
        stage: "Sơn hoàn thiện",
        caption: "Pha sơn một mẻ duy nhất cho cả 30 bản, đối chiếu mã màu brand.",
      },
      {
        file: "mascot-05-display",
        stage: "Thành phẩm",
        caption: "30 tượng xếp cạnh nhau, không lệch màu giữa các bản.",
      },
      {
        file: "mascot-06-shipping",
        stage: "Đóng gói & giao",
        caption: "Chia thùng theo từng chi nhánh, dán nhãn sẵn.",
      },
    ],
  },

  {
    slug: "mo-hinh-chua-kien-truc",
    title: "Mô hình chùa tỉ lệ 1:150 cho hồ sơ trùng tu",
    shortTitle: "Mô hình chùa 1:150",
    category: "business",
    description:
      "Một nhóm kiến trúc cần mô hình chùa tỉ lệ 1:150 để trình bày phương án trùng tu, yêu cầu giữ được chi tiết mái và các lớp ngói.",
    brief:
      "File CAD bản vẽ kỹ thuật, cần mô hình cầm tay để mang đi họp trong 10 ngày.",
    challenge:
      "Ở tỉ lệ 1:150, lớp ngói mái chỉ dày khoảng 0.4mm — mỏng hơn ngưỡng in FDM, nhưng in Resin toàn bộ thì vượt khổ máy.",
    solution:
      "In hỗn hợp: phần thân và nền bằng FDM cho chắc và rẻ, riêng cụm mái ngói in Resin 14K để giữ chi tiết, sau đó ghép lại và sơn thống nhất.",
    specs: [
      { label: "Tỉ lệ", value: "1:150" },
      { label: "Kích thước", value: "42 × 30 cm" },
      { label: "Công nghệ", value: "FDM + Resin 14K" },
      { label: "Thời gian", value: "10 ngày" },
    ],
    services: ["in-ky-thuat", "in-resin", "in-kho-lon", "hoan-thien"],
    imageDir: "mo-hinh-chua",
    steps: [
      {
        file: "chua-01-zalo",
        stage: "Khách gửi Zalo",
        caption: "File CAD bản vẽ trùng tu và deadline buổi họp.",
      },
      {
        file: "chua-02-cad",
        stage: "Chuẩn bị file",
        caption:
          "Tách file theo cụm, làm dày những chi tiết mỏng hơn ngưỡng in được.",
      },
      {
        file: "chua-03-printing",
        stage: "In hỗn hợp",
        caption: "Thân và nền in FDM, riêng cụm mái ngói in Resin 14K để giữ nét.",
      },
      {
        file: "chua-04-assembly",
        stage: "Lắp ráp",
        caption: "Ghép các cụm lên đế chung, căn chỉnh thẳng hàng cột và mái.",
      },
      {
        file: "chua-05-display",
        stage: "Thành phẩm",
        caption: "Mô hình hoàn thiện, đủ nhẹ để mang theo tới buổi trình bày.",
      },
      {
        file: "chua-06-shipping",
        stage: "Đóng gói & giao",
        caption: "Hộp có khung chống xê dịch, giao trước buổi họp một ngày.",
      },
    ],
  },

  {
    slug: "tuong-anime-lon-70cm",
    title: "Tượng nhân vật anime 70cm đặt trong tiệm game",
    shortTitle: "Tượng anime 70cm",
    category: "figure",
    description:
      "Chủ tiệm game muốn một tượng nhân vật cao 70cm đặt ở lối vào, đủ chắc để khách chạm vào hằng ngày.",
    brief: "Ảnh nhân vật từ game, yêu cầu cao 70cm và “chắc, khách sờ suốt”.",
    challenge:
      "Ở 70cm, tượng vừa phải nhẹ để di chuyển vừa phải chịu được va chạm hằng ngày — hai yêu cầu ngược nhau.",
    solution:
      "In PLA thành dày 3mm với gân chịu lực bên trong thay vì tăng infill, đổ cát vào đế cho hạ trọng tâm, phủ lớp sơn bóng 2K chống trầy.",
    specs: [
      { label: "Chiều cao", value: "70 cm" },
      { label: "Vật liệu", value: "PLA, phủ bóng 2K" },
      { label: "Số khối in", value: "8 khối" },
      { label: "Thời gian", value: "15 ngày" },
    ],
    services: ["in-kho-lon", "hoan-thien", "du-an-tron-goi"],
    imageDir: "tuong-anime-lon",
    steps: [
      {
        file: "goku-01-zalo",
        stage: "Khách gửi Zalo",
        caption: "Ảnh nhân vật trong game và vị trí dự định đặt tượng.",
      },
      {
        file: "goku-02-blender",
        stage: "Dựng mẫu 3D",
        caption: "Dựng model 70cm, thêm gân chịu lực bên trong và khoang đổ cát ở đế.",
      },
      {
        file: "goku-03-printing",
        stage: "In 3D",
        caption: "In 8 khối, thành dày 3mm để chịu va chạm mà không nặng thêm nhiều.",
      },
      {
        file: "goku-04-painting",
        stage: "Sơn hoàn thiện",
        caption: "Sơn màu theo nhân vật rồi phủ bóng 2K chống trầy xước.",
      },
      {
        file: "goku-05-display",
        stage: "Thành phẩm",
        caption: "Tượng đặt ở lối vào tiệm, đế nặng nên không đổ khi va phải.",
      },
      {
        file: "goku-06-shipping",
        stage: "Đóng gói & giao",
        caption: "Giao và lắp tại chỗ, đổ cát đế sau khi đặt đúng vị trí.",
      },
    ],
  },

  {
    slug: "trang-tri-tiec-cuoi",
    title: "Bộ trang trí tiệc cưới: chữ ký, số bàn và topper bánh",
    shortTitle: "Trang trí tiệc cưới",
    category: "decoration",
    description:
      "Một cặp đôi cần bộ trang trí cưới đồng bộ: bảng tên, 20 số bàn và topper bánh in theo đúng phông chữ thiệp mời.",
    brief: "Thiệp mời PDF, và mong muốn mọi thứ dùng cùng một phông chữ.",
    challenge:
      "Phông chữ trên thiệp có nét rất mảnh. In trực tiếp ở kích thước nhỏ sẽ gãy nét, nhất là ở topper bánh.",
    solution:
      "Chuyển chữ thành khối 3D và làm dày nét tối thiểu 1.2mm mà vẫn giữ dáng chữ, in Resin cho phần topper và FDM cho số bàn để tiết kiệm.",
    specs: [
      { label: "Hạng mục", value: "Bảng tên, 20 số bàn, topper" },
      { label: "Công nghệ", value: "Resin + FDM" },
      { label: "Hoàn thiện", value: "Sơn trắng ngà & nhũ vàng" },
      { label: "Thời gian", value: "7 ngày" },
    ],
    services: ["thiet-ke-3d", "in-resin", "in-hang-loat", "hoan-thien"],
    imageDir: "trang-tri-cuoi",
    steps: [
      {
        file: "cuoi-01-zalo",
        stage: "Khách gửi Zalo",
        caption: "Thiệp mời PDF, dùng làm chuẩn phông chữ cho cả bộ.",
      },
      {
        file: "cuoi-02-design",
        stage: "Dựng mẫu 3D",
        caption: "Chuyển chữ sang khối 3D, làm dày nét lên 1.2mm để không gãy khi in.",
      },
      {
        file: "cuoi-03-printing",
        stage: "In 3D",
        caption: "Topper in Resin cho nét sắc, 20 số bàn in FDM để tiết kiệm chi phí.",
      },
      {
        file: "cuoi-04-painting",
        stage: "Sơn hoàn thiện",
        caption: "Phủ trắng ngà, đánh nhũ vàng viền chữ cho hợp tông tiệc.",
      },
      {
        file: "cuoi-05-display",
        stage: "Thành phẩm",
        caption: "Bộ trang trí đồng bộ, cùng một phông chữ từ thiệp tới bánh.",
      },
      {
        file: "cuoi-06-shipping",
        stage: "Đóng gói & giao",
        caption: "Chia hộp theo hạng mục, giao trước ngày cưới hai hôm.",
      },
    ],
  },

  {
    slug: "banh-rang-thay-the",
    title: "Bánh răng thay thế cho máy đã ngừng sản xuất",
    shortTitle: "Bánh răng thay thế",
    category: "mechanical",
    description:
      "Khách mang tới một bánh răng nhựa bị vỡ của chiếc máy không còn phụ tùng thay thế. Chúng tôi đo, dựng lại và in bằng PETG.",
    brief:
      "Một bánh răng gãy răng, chụp ảnh kèm cây thước đặt bên cạnh. Hãng đã ngừng bán linh kiện.",
    challenge:
      "Bánh răng đã vỡ mất hai răng nên không đo trực tiếp được bước răng — phải suy ngược từ đường kính và số răng còn lại.",
    solution:
      "Đếm số răng còn nguyên, đo đường kính đỉnh bằng thước cặp rồi tính lại module, dựng CAD tham số và in thử một bản trước khi giao bản PETG chính thức.",
    specs: [
      { label: "Đường kính", value: "38 mm" },
      { label: "Vật liệu", value: "PETG" },
      { label: "Dung sai", value: "±0.1 mm" },
      { label: "Thời gian", value: "2 ngày" },
    ],
    services: ["thiet-ke-3d", "in-ky-thuat"],
    imageDir: "banh-rang-thay-the",
    steps: [
      {
        file: "gear-01-zalo",
        stage: "Khách gửi Zalo",
        caption: "Ảnh bánh răng đã vỡ, đặt cạnh cây thước để lấy kích thước tham chiếu.",
      },
      {
        file: "gear-02-cad",
        stage: "Dựng CAD",
        caption:
          "Tính lại module từ số răng còn nguyên và đường kính đỉnh, dựng CAD tham số.",
      },
      {
        file: "gear-03-printing",
        stage: "In & thử",
        caption: "In một bản thử để kiểm tra ăn khớp trước khi in bản chính thức.",
      },
      {
        file: "gear-04-testing",
        stage: "Kiểm tra lắp",
        caption: "Lắp thử vào máy, kiểm tra độ rơ và chỉnh dung sai trục.",
      },
      {
        file: "gear-05-display",
        stage: "Thành phẩm",
        caption: "Bánh răng PETG hoàn thiện, chịu nhiệt tốt hơn nhựa nguyên bản.",
      },
      {
        file: "gear-06-shipping",
        stage: "Bàn giao",
        caption: "Giao kèm file CAD để khách in lại khi cần.",
      },
    ],
  },
];

export function getAllCaseStudies(): CaseStudy[] {
  return CASE_STUDIES;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter((study) => study.featured);
}

/** Full public path for a step image. */
export function stepImage(study: CaseStudy, step: CaseStudyStep): string {
  return `/assets/generated/projects/${study.imageDir}/${step.file}.webp`;
}

/** The "thành phẩm" shot, used as the card and OG image. */
export function coverImage(study: CaseStudy): string {
  const display =
    study.steps.find((s) => s.file.includes("display")) ??
    study.steps[study.steps.length - 1];
  return stepImage(study, display);
}

/** Related studies: same category first, then anything else. */
export function getRelatedCaseStudies(slug: string, limit = 3): CaseStudy[] {
  const current = getCaseStudyBySlug(slug);
  if (!current) return [];
  const others = CASE_STUDIES.filter((s) => s.slug !== slug);
  return [
    ...others.filter((s) => s.category === current.category),
    ...others.filter((s) => s.category !== current.category),
  ].slice(0, limit);
}
