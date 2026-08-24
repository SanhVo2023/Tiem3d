// The six project photo-stories the portfolio referenced but that were never
// generated. File names here must match `imageDir` + `steps[].file` in
// src/lib/portfolio.ts, or the case-study pages render broken images.

const SHOP_STYLE = `
Real small Vietnamese 3D printing workshop. Natural daylight, practical setup.
Photorealistic, smartphone-quality but well composed. Warm tones.
Not a studio, not stock-photo clean - a working shop that is tidy but used.
`;

const PRODUCT_STYLE = `
Clean product photography. Soft natural daylight, neutral backdrop.
Shallow depth of field, the object is the subject. Bright and modern.
`;

export const VN_PROJECTS = {
  // ==========================================
  "rong-trang-tri": {
    name: "Rồng trang trí 80cm",
    description: "Rồng trang trí cho sảnh quán cà phê dịp Tết",
    product: {
      type: "80cm long decorative Vietnamese dragon sculpture",
      material: "PLA, painted brown base with gold leaf highlights on scales",
      features:
        "sinuous curved body in 9 segments, detailed scales, flowing whiskers, gold accents catching warm light",
    },
    steps: [
      {
        name: "rong-01-zalo",
        stage: "Khách gửi Zalo",
        prompt: () => `
          Phone screenshot of a Zalo chat, Vietnamese interface. Customer has sent
          several Pinterest reference photos of decorative dragon sculptures.
          Chat bubbles visible, contact name blurred for privacy.
          Phone resting on a cafe table. Realistic chat screenshot look.
        `,
      },
      {
        name: "rong-02-blender",
        stage: "Dựng mẫu 3D",
        prompt: (p) => `
          Computer workstation in a small Vietnamese 3D printing shop.
          Monitor shows Blender with a ${p.type} being modelled, body split into
          numbered segments with visible joint pins. Wireframe and solid viewports.
          Desk with coffee cup and notes. ${SHOP_STYLE}
        `,
      },
      {
        name: "rong-03-printing",
        stage: "In 3D",
        prompt: (p) => `
          Several FDM 3D printers on metal shelving, printing large curved segments
          of a ${p.type} in grey PLA. Hollow interiors visible on finished segments
          resting nearby. Filament spools hanging. ${SHOP_STYLE}
        `,
      },
      {
        name: "rong-04-painting",
        stage: "Sơn hoàn thiện",
        prompt: (p) => `
          Finishing bench covered in newspaper. Dragon segments of a ${p.type}
          being painted - brown base coat done, artist applying gold leaf highlights
          to individual scales with a fine brush. Paint pots and masks nearby.
          ${SHOP_STYLE}
        `,
      },
      {
        name: "rong-05-display",
        stage: "Thành phẩm",
        prompt: (p) => `
          Completed ${p.type} fully assembled, displayed in a warm-lit cafe lobby.
          ${p.features}. The gold scales catch the warm lighting.
          ${PRODUCT_STYLE}
        `,
      },
      {
        name: "rong-06-shipping",
        stage: "Đóng gói & giao",
        prompt: (p) => `
          Packing station. Segments of a ${p.type} individually wrapped in bubble
          wrap, laid in a long cardboard box with numbered labels on each piece
          and a printed assembly guide on top. ${SHOP_STYLE}
        `,
      },
    ],
  },

  // ==========================================
  "mascot-cua-hang": {
    name: "Linh vật thương hiệu",
    description: "30 tượng linh vật nhỏ cho chuỗi cửa hàng đồ uống",
    product: {
      type: "12cm tall cute brand mascot figurine for a Vietnamese drinks brand",
      material: "PLA, painted in flat brand colours",
      features:
        "rounded friendly character, simple bold shapes, consistent flat colour finish",
    },
    steps: [
      {
        name: "mascot-01-zalo",
        stage: "Khách gửi Zalo",
        prompt: () => `
          Phone screenshot of a Zalo chat, Vietnamese interface. Customer has sent
          a brand guideline PDF thumbnail and a flat 2D front-view mascot illustration.
          Business-like conversation, contact name blurred.
          Phone on a clean desk beside a laptop.
        `,
      },
      {
        name: "mascot-02-blender",
        stage: "Dựng mẫu 3D",
        prompt: (p) => `
          Monitor showing 3D modelling software with a ${p.type} being sculpted from
          a flat 2D reference pinned beside the viewport. Render preview open for
          client approval. Organised desk. ${SHOP_STYLE}
        `,
      },
      {
        name: "mascot-03-printing",
        stage: "In hàng loạt",
        prompt: (p) => `
          Batch production: multiple FDM printers running in parallel, each build
          plate covered with several copies of a ${p.type} in identical grey PLA.
          Rows of finished raw prints lined up on a tray. ${SHOP_STYLE}
        `,
      },
      {
        name: "mascot-04-painting",
        stage: "Sơn hoàn thiện",
        prompt: (p) => `
          Painting station with a single large mixed batch of paint in a pot, and
          thirty copies of a ${p.type} lined up in rows being spray painted the same
          brand colour. Colour swatch card pinned up for reference. ${SHOP_STYLE}
        `,
      },
      {
        name: "mascot-05-display",
        stage: "Thành phẩm",
        prompt: (p) => `
          Thirty finished ${p.type} arranged in neat rows on a white surface,
          all identical in colour. ${p.features}. ${PRODUCT_STYLE}
        `,
      },
      {
        name: "mascot-06-shipping",
        stage: "Đóng gói & giao",
        prompt: (p) => `
          Several small cardboard boxes on a packing table, each labelled with a
          different Vietnamese store branch name, being filled with wrapped
          ${p.type} figurines. ${SHOP_STYLE}
        `,
      },
    ],
  },

  // ==========================================
  "mo-hinh-chua": {
    name: "Mô hình chùa 1:150",
    description: "Mô hình kiến trúc chùa Việt cho hồ sơ trùng tu",
    product: {
      type: "1:150 scale architectural model of a traditional Vietnamese pagoda",
      material: "FDM body with resin-printed tiled roof, painted in muted tones",
      features:
        "layered curved tile roofs, fine columns, stone base, precise architectural detail",
    },
    steps: [
      {
        name: "chua-01-zalo",
        stage: "Khách gửi Zalo",
        prompt: () => `
          Phone screenshot of a Zalo chat, Vietnamese interface. An architect has
          sent CAD drawing files and elevation drawings of a traditional pagoda,
          discussing a deadline. Contact name blurred. Phone on a drafting desk.
        `,
      },
      {
        name: "chua-02-cad",
        stage: "Chuẩn bị file",
        prompt: (p) => `
          Monitor showing CAD software with a ${p.type} split into separate
          assemblies, thin roof-tile geometry highlighted and being thickened.
          Technical drawings pinned beside the monitor. ${SHOP_STYLE}
        `,
      },
      {
        name: "chua-03-printing",
        stage: "In hỗn hợp",
        prompt: (p) => `
          Split view of a workshop: an FDM printer producing the pagoda body and
          base, and a resin printer beside it with a finely detailed tiled roof
          section for a ${p.type} just lifted from the vat, still wet.
          ${SHOP_STYLE}
        `,
      },
      {
        name: "chua-04-assembly",
        stage: "Lắp ráp",
        prompt: (p) => `
          Assembly bench with tweezers and precision tools. A ${p.type} being
          assembled - roof sections placed onto columns, alignment being checked
          by eye. Small parts laid out on a tray. ${SHOP_STYLE}
        `,
      },
      {
        name: "chua-05-display",
        stage: "Thành phẩm",
        prompt: (p) => `
          Finished ${p.type} on a neutral base. ${p.features}.
          Photographed from a slightly raised angle to show the roof layers.
          ${PRODUCT_STYLE}
        `,
      },
      {
        name: "chua-06-shipping",
        stage: "Đóng gói & giao",
        prompt: (p) => `
          A ${p.type} secured inside a custom fitted box with foam bracing so it
          cannot shift, lid open showing the model nested safely. ${SHOP_STYLE}
        `,
      },
    ],
  },

  // ==========================================
  "tuong-anime-lon": {
    name: "Tượng anime 70cm",
    description: "Tượng nhân vật lớn đặt trong tiệm game",
    product: {
      type: "70cm tall anime action character statue in a dynamic pose",
      material: "PLA, hand painted with 2K gloss clear coat",
      features:
        "bold spiky hair, dynamic stance, saturated anime colours, glossy finish, heavy weighted base",
    },
    steps: [
      {
        name: "goku-01-zalo",
        stage: "Khách gửi Zalo",
        prompt: () => `
          Phone screenshot of a Zalo chat, Vietnamese interface. Customer has sent
          anime character artwork plus a photo of a game shop entrance where the
          statue will stand. Contact name blurred. Phone on a shop counter.
        `,
      },
      {
        name: "goku-02-blender",
        stage: "Dựng mẫu 3D",
        prompt: (p) => `
          Monitor showing 3D sculpting software with a ${p.type} model, cutaway
          view revealing internal support ribs and a hollow sand-fillable base
          chamber. Reference artwork on a second screen. ${SHOP_STYLE}
        `,
      },
      {
        name: "goku-03-printing",
        stage: "In 3D",
        prompt: (p) => `
          Multiple large FDM printers running, printing big body sections of a
          ${p.type} in grey PLA with thick walls. Completed sections stacked on a
          shelf beside them showing the scale. ${SHOP_STYLE}
        `,
      },
      {
        name: "goku-04-painting",
        stage: "Sơn hoàn thiện",
        prompt: (p) => `
          Spray booth corner of the shop. Large sections of a ${p.type} being
          airbrushed in bright saturated anime colours, some already glossy from
          clear coat. Respirator and spray gun on the bench. ${SHOP_STYLE}
        `,
      },
      {
        name: "goku-05-display",
        stage: "Thành phẩm",
        prompt: (p) => `
          Completed ${p.type} standing at the entrance of a Vietnamese game shop,
          people passing in soft blur behind. ${p.features}. ${PRODUCT_STYLE}
        `,
      },
      {
        name: "goku-06-shipping",
        stage: "Đóng gói & giao",
        prompt: (p) => `
          Two people carefully carrying a wrapped section of a ${p.type} into a
          shop, a bag of sand for the base weight sitting nearby on the floor.
          ${SHOP_STYLE}
        `,
      },
    ],
  },

  // ==========================================
  "trang-tri-cuoi": {
    name: "Trang trí tiệc cưới",
    description: "Bộ trang trí cưới đồng bộ theo phông chữ thiệp mời",
    product: {
      type: "wedding decoration set - name sign, table numbers and cake topper",
      material: "resin topper and FDM table numbers, ivory white with gold edging",
      features:
        "elegant script lettering, consistent typeface across all pieces, ivory and gold palette",
    },
    steps: [
      {
        name: "cuoi-01-zalo",
        stage: "Khách gửi Zalo",
        prompt: () => `
          Phone screenshot of a Zalo chat, Vietnamese interface. A couple has sent
          a PDF wedding invitation with elegant script lettering, asking to match
          the typeface. Contact name blurred. Phone on a table with flowers.
        `,
      },
      {
        name: "cuoi-02-design",
        stage: "Dựng mẫu 3D",
        prompt: () => `
          Monitor showing 3D software where flat script lettering is being
          extruded into solid 3D letters, thin strokes visibly being thickened.
          The printed wedding invitation lies on the desk as reference.
          ${SHOP_STYLE}
        `,
      },
      {
        name: "cuoi-03-printing",
        stage: "In 3D",
        prompt: () => `
          Two printers side by side: a resin printer producing a delicate script
          cake topper, and an FDM printer producing a batch of numbered table
          number stands. ${SHOP_STYLE}
        `,
      },
      {
        name: "cuoi-04-painting",
        stage: "Sơn hoàn thiện",
        prompt: (p) => `
          Finishing bench with pieces of a ${p.type} being sprayed ivory white,
          and a fine brush applying gold edging along the letter edges.
          ${SHOP_STYLE}
        `,
      },
      {
        name: "cuoi-05-display",
        stage: "Thành phẩm",
        prompt: (p) => `
          Complete ${p.type} arranged together on a white cloth - name sign,
          several table numbers and the cake topper. ${p.features}.
          ${PRODUCT_STYLE}
        `,
      },
      {
        name: "cuoi-06-shipping",
        stage: "Đóng gói & giao",
        prompt: () => `
          Separate small boxes on a packing table, each labelled by item type,
          delicate script letters wrapped in tissue paper inside. ${SHOP_STYLE}
        `,
      },
    ],
  },

  // ==========================================
  "banh-rang-thay-the": {
    name: "Bánh răng thay thế",
    description: "Bánh răng nhựa thay thế cho máy đã ngừng sản xuất",
    product: {
      type: "38mm diameter replacement plastic spur gear",
      material: "black PETG",
      features:
        "precise involute teeth, clean central bore with keyway, engineering part",
    },
    steps: [
      {
        name: "gear-01-zalo",
        stage: "Khách gửi Zalo",
        prompt: () => `
          Phone screenshot of a Zalo chat, Vietnamese interface. Customer has sent
          a photo of a small broken plastic gear with two teeth missing, laid on a
          table next to a steel ruler for scale. Contact name blurred.
        `,
      },
      {
        name: "gear-02-cad",
        stage: "Dựng CAD",
        prompt: (p) => `
          Monitor showing parametric CAD software with a ${p.type} being modelled,
          tooth count and module parameters visible in a dimension panel. The
          broken original gear and a digital caliper lie on the desk. ${SHOP_STYLE}
        `,
      },
      {
        name: "gear-03-printing",
        stage: "In & thử",
        prompt: (p) => `
          Close-up of an FDM printer bed finishing a small ${p.type} in black PETG,
          a first test print of the same gear sitting beside it. ${SHOP_STYLE}
        `,
      },
      {
        name: "gear-04-testing",
        stage: "Kiểm tra lắp",
        prompt: (p) => `
          Hands fitting a ${p.type} onto a shaft inside an opened machine housing,
          checking the mesh with the mating gear. Digital caliper and small
          screwdrivers on the bench. ${SHOP_STYLE}
        `,
      },
      {
        name: "gear-05-display",
        stage: "Thành phẩm",
        prompt: (p) => `
          Finished ${p.type} photographed beside the broken original gear it
          replaces, showing the contrast. ${p.features}. ${PRODUCT_STYLE}
        `,
      },
      {
        name: "gear-06-shipping",
        stage: "Bàn giao",
        prompt: (p) => `
          A small padded envelope with a ${p.type} in a zip bag, and a USB stick
          or printed QR code labelled with the CAD file, ready to hand over.
          ${SHOP_STYLE}
        `,
      },
    ],
  },
};

// The one file defined in the original generator but never produced on disk.
export const MISSING_SINGLES = [
  {
    dir: "anime-figure",
    name: "anime-02-zbrush",
    prompt: `
      Monitor showing digital sculpting software with an anime figure model split
      into seven separate parts laid out on the workspace, support points marked
      on hidden surfaces. Vietnamese 3D printing shop desk, natural light.
      Photorealistic, warm tones, practical working setup.
    `,
  },
];
