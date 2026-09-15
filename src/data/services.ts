export interface ServiceDetail {
  slug: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  heading: string;
  applications: { title: string; text: string }[];
  preparation: string[];
  process: string[];
  faq: { question: string; answer: string }[];
  related: string[];
  priceTable?: string;
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "in-fdm",
    title: "In 3D FDM: từ bản mẫu đến chi tiết sử dụng",
    intro: "In nhựa sợi phù hợp cho vỏ hộp, giá đỡ, bản mẫu và mô hình kích thước lớn. Chọn vật liệu theo tải trọng, nhiệt độ và cách sử dụng thực tế.",
    image: "/assets/generated/services/service-fdm-hero.webp",
    imageAlt: "Minh họa sản phẩm in 3D bằng nhựa sợi FDM",
    heading: "Chọn nhựa theo việc bạn cần làm",
    applications: [
      { title: "PLA · mô hình trong nhà", text: "Phù hợp bản mẫu hình dáng và đồ trưng bày. Tránh vị trí có nhiệt độ cao, như bên trong xe đỗ dưới nắng." },
      { title: "PETG, ABS, ASA · chi tiết sử dụng", text: "Trao đổi yêu cầu chịu lực, nhiệt và nắng ngoài trời để chọn vật liệu. Hướng in và độ dày thành cũng ảnh hưởng độ bền." },
      { title: "TPU, Nylon · yêu cầu riêng", text: "TPU dành cho chi tiết cần đàn hồi; Nylon và vật liệu gia cường cần được chọn theo môi trường và tải trọng cụ thể." },
    ],
    preparation: ["File STL, OBJ, 3MF hoặc STEP; ghi đơn vị mm.", "Kích thước tổng thể, số lượng và vị trí cần lắp ghép.", "Tải trọng, nhiệt độ sử dụng, màu và ngày cần nhận."],
    process: ["Kiểm tra file, thành mỏng và các phần cần giá đỡ khi in.", "Thống nhất vật liệu, hướng in, độ đặc và báo giá.", "In, tháo giá đỡ, kiểm tra rồi đóng gói gửi qua đơn vị vận chuyển."],
    faq: [
      { question: "FDM có nhìn thấy vân in không?", answer: "Có thể thấy vân lớp trên bề mặt, tùy hướng in và chiều cao lớp. Nếu cần bề mặt trưng bày, hãy yêu cầu thêm chà nhám và sơn hoặc trao đổi phương án Resin." },
      { question: "Chi tiết in có lắp vừa ngay không?", answer: "Kích thước cần khớp phải được ghi rõ trong bản vẽ. Với chi tiết quan trọng, nên in mẫu thử để chỉnh khe hở trước khi làm số lượng lớn." },
    ],
    related: ["in-ky-thuat", "in-kho-lon", "hoan-thien"], priceTable: "fdm",
  },
  {
    slug: "in-resin",
    title: "In 3D Resin cho mô hình nhiều chi tiết",
    intro: "Phù hợp figure, mô hình thu nhỏ và hoa văn tinh. Tiệm kiểm tra độ dày, tư thế in và cách xử lý bề mặt trước khi báo giá.",
    image: "/assets/generated/services/service-resin-detail.webp",
    imageAlt: "Minh họa mô hình Resin với các chi tiết nhỏ",
    heading: "Khi đường nét là phần quan trọng nhất",
    applications: [
      { title: "Figure và mô hình thu nhỏ", text: "Giữ nét ở khuôn mặt, tóc, áo và các bề mặt cong. Những phần mảnh cần được kiểm tra để hạn chế gãy khi xử lý và vận chuyển." },
      { title: "Mẫu trưng bày", text: "Bề mặt mịn phù hợp các mẫu nhỏ cần quan sát gần. Có thể trao đổi thêm về làm rỗng, chốt ghép và đế trưng bày." },
      { title: "Mẫu cần sơn", text: "Xác nhận màu nền và mức xử lý vết giá đỡ. Phần sơn màu và hiệu ứng được báo riêng theo độ phức tạp." },
    ],
    preparation: ["File 3D và chiều cao hoặc tỉ lệ mong muốn.", "Chi tiết cần giữ nét, bộ phận tháo rời và yêu cầu đế.", "Số lượng, yêu cầu sơn và ngày cần nhận."],
    process: ["Kiểm tra thành mỏng, tách khối và lỗ thoát nhựa nếu làm rỗng.", "Thống nhất loại Resin và mức hoàn thiện trước khi in.", "Rửa, xử lý UV, tháo giá đỡ và kiểm tra trước khi đóng gói."],
    faq: [
      { question: "8K, 14K và 16K khác nhau thế nào?", answer: "Đó là độ phân giải màn hình máy in, không phải cam kết dung sai của mọi sản phẩm. Chất lượng thực tế còn phụ thuộc kích thước điểm ảnh, vật liệu, hình học và cách đặt mẫu." },
      { question: "Resin có phù hợp làm chi tiết chịu lực không?", answer: "Cần chọn loại nhựa theo tải trọng và môi trường. Resin dùng cho mô hình trưng bày không mặc nhiên phù hợp cho chi tiết cơ khí; hãy trao đổi mục đích sử dụng trước." },
    ],
    related: ["thiet-ke-3d", "hoan-thien", "in-fdm"], priceTable: "resin",
  },
  {
    slug: "in-kho-lon",
    title: "In 3D khổ lớn cho mô hình và props",
    intro: "Tượng trang trí, mô hình kiến trúc và phụ kiện cosplay được lên phương án chia khối, lắp ghép và hoàn thiện theo kích thước bạn cần.",
    image: "/assets/generated/projects/project4-06-finished.webp",
    imageAlt: "Minh họa mô hình in 3D kích thước lớn",
    heading: "Tính cả việc lắp, dùng và vận chuyển",
    applications: [
      { title: "Tượng và vật trang trí", text: "Chia khối theo đường nét để dễ ghép và xử lý bề mặt. Xác nhận màu, độ bóng và mức che vân in ngay khi báo giá." },
      { title: "Props cosplay", text: "Cần số đo người dùng, giới hạn khối lượng và cách đeo hoặc cầm. Mẫu đội đầu cần kiểm tra khoảng hở và vị trí lắp." },
      { title: "Mô hình kiến trúc", text: "Lên tỉ lệ tổng thể và các cụm tháo rời để thuận tiện trình bày, bảo quản và vận chuyển." },
    ],
    preparation: ["Kích thước thực, ảnh tham khảo hoặc file 3D.", "Vị trí sử dụng, cách lắp, yêu cầu chịu lực và bề mặt.", "Địa chỉ giao, lối đưa mô hình vào và thời hạn dự kiến."],
    process: ["Chọn vật liệu, tỉ lệ và vị trí chia khối.", "Duyệt cách ghép, chi phí in và phần hoàn thiện.", "In, ghép thử, xử lý theo thỏa thuận rồi đóng gói vận chuyển."],
    faq: [
      { question: "Mô hình lớn có được in nguyên khối không?", answer: "Tùy kích thước và hình học. Chia khối thường giúp kiểm soát việc in và vận chuyển; tiệm trao đổi các đường ghép trước khi làm." },
      { question: "Có thấy đường ghép sau khi sơn không?", answer: "Mức che đường ghép phụ thuộc vật liệu, hình học và công xử lý bề mặt. Hãy nêu khoảng cách trưng bày và yêu cầu bề mặt để tiệm báo đúng mức hoàn thiện." },
    ],
    related: ["in-fdm", "hoan-thien", "du-an-tron-goi"],
  },
  {
    slug: "in-ky-thuat",
    title: "In 3D chi tiết kỹ thuật và mẫu lắp ghép",
    intro: "Làm vỏ thiết bị, giá đỡ, chi tiết thay thế và mẫu kiểm tra lắp ráp. Kích thước quan trọng và điều kiện sử dụng được trao đổi riêng cho từng mẫu.",
    image: "/assets/generated/products/product-gear.webp",
    imageAlt: "Minh họa bánh răng nhựa và chi tiết lắp ghép",
    heading: "Bắt đầu từ yêu cầu sử dụng",
    applications: [
      { title: "Thử hình dáng và lắp ráp", text: "In mẫu để kiểm tra khoảng hở, vị trí lỗ, dây dẫn và cách tháo lắp trước khi quyết định phương án sản xuất." },
      { title: "Chi tiết thay thế", text: "Gửi ảnh, số đo hoặc bản vẽ của chi tiết. Những vị trí chịu tải, ma sát và nhiệt cần được chỉ rõ để chọn nhựa và hướng in." },
      { title: "Đồ gá và giá đỡ", text: "Xác định mặt tì, cách bắt vít và tải trọng. Có thể cần chỉnh mẫu sau lần thử đầu tiên để đạt khả năng lắp mong muốn." },
    ],
    preparation: ["STEP hoặc bản vẽ có kích thước; STL nếu đã có mẫu để in.", "Dung sai ở từng vị trí quan trọng và thông tin chi tiết đối tiếp.", "Tải trọng, nhiệt, độ ẩm, ma sát và số lượng cần làm."],
    process: ["Rà soát hình học và khả năng đạt kích thước yêu cầu.", "Chọn nhựa và thống nhất mẫu thử, cách đo kiểm.", "In, kiểm tra các kích thước đã thống nhất, chỉnh mẫu nếu cần."],
    faq: [
      { question: "Tiệm có cam kết dung sai ±0,1 mm cho mọi chi tiết không?", answer: "Không áp dụng một dung sai chung cho mọi mẫu. Khả năng đạt kích thước phụ thuộc vật liệu, kích thước, hướng in và hình học; các vị trí quan trọng cần được xác nhận trong báo giá." },
      { question: "Chưa có bản vẽ CAD thì làm được không?", answer: "Có thể bắt đầu từ ảnh và số đo để kiểm tra khả năng dựng lại. Nếu cần đo mẫu thật, hãy liên hệ cơ sở Thủ Đức trước; xưởng Tân Phú không đón khách." },
    ],
    related: ["thiet-ke-3d", "in-fdm", "in-hang-loat"],
  },
  {
    slug: "thiet-ke-3d",
    title: "Thiết kế 3D từ ảnh, bản vẽ và ý tưởng",
    intro: "Chưa có file vẫn có thể bắt đầu. Gửi ảnh tham khảo hoặc bản vẽ tay để tiệm trao đổi về hình dáng, kích thước và cách biến mẫu thành sản phẩm in được.",
    image: "/assets/generated/services/service-design-tablet.webp",
    imageAlt: "Minh họa quá trình dựng mẫu 3D trên máy tính",
    heading: "Dựng đúng mẫu cho mục đích của bạn",
    applications: [
      { title: "Mẫu cơ khí và vỏ hộp", text: "Ưu tiên kích thước, vị trí lắp ghép, lỗ bắt vít và khả năng chỉnh sửa về sau." },
      { title: "Mô hình và nhân vật", text: "Trao đổi ảnh tham khảo, tỉ lệ, tư thế và các chi tiết cần giữ. Ảnh nhiều góc giúp mô tả mẫu rõ hơn." },
      { title: "Chỉnh file để in", text: "Kiểm tra độ dày, lỗi bề mặt, chia mảnh, chốt ghép và kích thước trước khi đưa file vào sản xuất." },
    ],
    preparation: ["Ảnh các góc hoặc bản vẽ kèm kích thước.", "Mục đích sử dụng, công nghệ in dự kiến và mức chi tiết.", "Định dạng file cần nhận, ngân sách và thời hạn."],
    process: ["Thống nhất phạm vi, định dạng bàn giao và số vòng chỉnh sửa.", "Dựng mẫu, gửi hình xem trước để bạn kiểm tra.", "Chỉnh theo phạm vi đã chốt, bàn giao file hoặc chuyển sang in."],
    faq: [
      { question: "Một ảnh có đủ để dựng lại mô hình không?", answer: "Một ảnh giúp bắt đầu trao đổi nhưng không thể hiện mặt khuất và chiều sâu. Tiệm sẽ yêu cầu thêm ảnh, số đo hoặc xác nhận cách dựng những phần chưa rõ." },
      { question: "Tôi nhận file gì và được chỉnh bao nhiêu lần?", answer: "STL, OBJ hoặc STEP tùy loại thiết kế. Định dạng bàn giao, quyền sử dụng và số vòng chỉnh sửa cần được thống nhất trước khi làm; thay đổi ngoài phạm vi có thể phát sinh chi phí." },
    ],
    related: ["in-ky-thuat", "in-resin", "du-an-tron-goi"],
  },
  {
    slug: "hoan-thien",
    title: "Chà nhám và sơn hoàn thiện mô hình 3D",
    intro: "Từ mẫu in thô đến bề mặt trưng bày: xử lý vân in, ghép khối, sơn màu và tạo hiệu ứng theo ảnh tham khảo.",
    image: "/assets/generated/services/service-finish-hero.webp",
    imageAlt: "Minh họa công đoạn sơn hoàn thiện mô hình in 3D",
    heading: "Thống nhất bề mặt trước khi sơn",
    applications: [
      { title: "Chà nhám và xử lý mối ghép", text: "Loại bỏ giá đỡ, bả các vị trí cần thiết và làm mịn theo mức hoàn thiện đã thống nhất." },
      { title: "Sơn màu mô hình", text: "Chọn màu nền, vùng chuyển màu, độ bóng hoặc mờ theo ảnh tham khảo. Màu trên màn hình có thể khác màu thực tế." },
      { title: "Hiệu ứng bề mặt", text: "Trao đổi hiệu ứng kim loại, đồng cổ hoặc cũ hóa. Phương pháp và độ bền bề mặt được chọn theo mục đích trưng bày." },
    ],
    preparation: ["Ảnh hoặc file mô hình, kích thước và vật liệu.", "Ảnh màu, hiệu ứng và mức hoàn thiện mong muốn.", "Các bộ phận cần tháo lắp và ngày cần nhận."],
    process: ["Kiểm tra bề mặt mẫu và thống nhất phạm vi xử lý.", "Chà, bả, sơn nền rồi thực hiện màu và hiệu ứng.", "Kiểm tra bề mặt, để ổn định lớp phủ và đóng gói bảo vệ."],
    faq: [
      { question: "Giá in đã gồm sơn chưa?", answer: "Giá in cơ bản và chi phí sơn là các phần riêng. Sơn phụ thuộc kích thước, số màu, hoa văn và thời gian xử lý bề mặt; xem bảng giá tham khảo rồi gửi mẫu để được báo cụ thể." },
      { question: "Tiệm có nhận sơn mẫu tôi đã in không?", answer: "Gửi ảnh rõ bề mặt, vật liệu và kích thước để tiệm kiểm tra khả năng tiếp nhận. Cách gửi mẫu và phí vận chuyển được xác nhận khi trao đổi." },
    ],
    related: ["in-resin", "in-kho-lon", "du-an-tron-goi"],
  },
  {
    slug: "in-hang-loat",
    title: "In 3D hàng loạt theo mẫu đã duyệt",
    intro: "Nhân bản chi tiết, quà tặng và mô hình theo số lượng bạn cần. Duyệt một mẫu trước giúp thống nhất kích thước, vật liệu và mức hoàn thiện cho cả lô.",
    image: "/assets/generated/services/service-batch-hero.webp",
    imageAlt: "Minh họa nhiều sản phẩm in 3D trong một lô",
    heading: "Ổn định mẫu trước, nhân số lượng sau",
    applications: [
      { title: "Chi tiết cùng thiết kế", text: "Thống nhất file, phiên bản và những kích thước cần kiểm tra để các đợt sản xuất có cùng yêu cầu." },
      { title: "Quà tặng và mô hình", text: "Gửi số lượng theo từng màu hoặc mẫu. Các công đoạn sơn, lắp ráp và đóng gói được tính cùng kế hoạch giao." },
      { title: "Giao theo từng đợt", text: "Trao đổi số lượng, mốc thời gian và địa chỉ nhận của từng đợt để tiệm kiểm tra khả năng đáp ứng." },
    ],
    preparation: ["File mẫu cuối cùng và tổng số lượng.", "Số lượng theo màu, vật liệu hoặc phiên bản.", "Tiêu chí kiểm tra, cách đóng gói và lịch giao dự kiến."],
    process: ["Báo giá theo số lượng và phạm vi hoàn thiện.", "Làm mẫu thử, xác nhận mẫu duyệt trước khi chạy cả lô.", "Sản xuất, kiểm tra theo tiêu chí và giao qua đơn vị vận chuyển."],
    faq: [
      { question: "In nhiều có rẻ hơn không?", answer: "Đơn giá có thể giảm khi chia sẻ thời gian chuẩn bị và cách xếp mẫu. Mức cụ thể còn phụ thuộc vật liệu, số lượng và công hoàn thiện; tiệm báo theo file thực tế." },
      { question: "Có nên bỏ qua mẫu thử để giao nhanh hơn?", answer: "Mẫu thử giúp phát hiện vấn đề về kích thước, màu và bề mặt trước khi nhân bản. Với thiết kế mới hoặc chi tiết lắp ghép, nên dành thời gian cho bước duyệt này." },
    ],
    related: ["in-fdm", "in-resin", "in-ky-thuat"],
  },
  {
    slug: "du-an-tron-goi",
    title: "Dự án in 3D trọn gói, từ ý tưởng đến thành phẩm",
    intro: "Một đầu mối trao đổi cho thiết kế, in và hoàn thiện. Phạm vi công việc, các mốc duyệt mẫu và lịch giao được thống nhất trước khi bắt đầu.",
    image: "/assets/generated/projects/project1-04-finished.webp",
    imageAlt: "Minh họa sản phẩm hoàn thiện từ một ý tưởng thiết kế",
    heading: "Theo dõi từng mốc, kiểm tra từng phần",
    applications: [
      { title: "Chưa có file 3D", text: "Bắt đầu từ ảnh hoặc mô tả để xác định phần thiết kế cần làm và thông tin còn thiếu." },
      { title: "Cần nhiều công đoạn", text: "Kết hợp chia khối, in, ghép, xử lý bề mặt và sơn theo một phạm vi rõ ràng." },
      { title: "Có ngày cần nhận cụ thể", text: "Chia lịch thành các mốc duyệt thiết kế, mẫu in và hoàn thiện; tính thêm thời gian vận chuyển." },
    ],
    preparation: ["Mô tả mục đích, ảnh tham khảo và kích thước.", "Số lượng, yêu cầu bề mặt, ngân sách dự kiến.", "Người duyệt mẫu, địa chỉ nhận và thời hạn."],
    process: ["Thống nhất thiết kế, phần in, hoàn thiện và các khoản chi phí.", "Dựng mẫu, duyệt thiết kế rồi sản xuất theo từng mốc.", "Kiểm tra thành phẩm và đóng gói giao qua đơn vị vận chuyển."],
    faq: [
      { question: "Báo giá trọn gói bao gồm những gì?", answer: "Báo giá ghi rõ phần thiết kế, vật liệu, in, hoàn thiện và vận chuyển được tính. Số lần chỉnh, file bàn giao và các hạng mục ngoài phạm vi cần được xác nhận trước." },
      { question: "Tôi có thể thay đổi mẫu sau khi đã in không?", answer: "Thay đổi sau khi sản xuất có thể cần dựng lại, in lại hoặc sơn lại. Tiệm sẽ trao đổi phần chi phí và lịch phát sinh trước khi thực hiện." },
    ],
    related: ["thiet-ke-3d", "in-kho-lon", "hoan-thien"],
  },
];
