# LKF Muse II: the brunette (Higgsfield)

Second LKF model. She shares the house look with Muse I (same lace mask, crimson lips, black background with golden light), but she's a different woman. **Never put both models' references in the same generation**, or their faces will blend.
The shared rules (checklist, consistency rules, brand look) are in `../LKF_MODEL_GUIDE.md` sections 4–6.

---

## 1. Identity lock (copy word for word)

| Element | Locked description |
|---|---|
| Face | Adult woman, sculpted high cheekbones, straight defined nose, strong elegant jawline, full lips |
| Eyes | Deep brown almond eyes, long lashes, smoky bronze-brown eyeshadow, sharp defined dark brows |
| Lips | Glossy deep crimson / oxblood lipstick, always |
| Hair | Glossy dark espresso-brown hair, slicked tightly back with no parting into a long sleek low ponytail falling down her back |
| Skin | Warm olive skin with a golden glow, real pore texture |
| Signature mask | Black guipure lace masquerade eye mask, ornate filigree peak at the center of the forehead, open almond eye cutouts, scalloped lower edge, sheer black mesh between the lace |
| Body | Slim athletic, very tall, long legs, defined shoulders |

**Muse I vs Muse II at a glance:** platinum bun + ice-blue eyes + light skin (I) · espresso **low ponytail** + **brown eyes** + **olive skin** (II).

---

## 2. Character sheet settings

- **Tier:** Normal · **Randomize:** OFF
- Gender: Female · Age: Adult · Skin: **Olive**
- Hairstyle: Long hair · Hair colour: **Dark brown**
- Eyes: **Brown**, Almond
- Features: High cheekbones, Full lips, Thick brows · Distinctive: Big lashes
- Build: **Athletic** · Height: Very tall · Proportions: Long limbs, Broad shoulders
- Ethnicity: left unset so her face comes from the identity image
- **Identity image:** `lkf2_identity.jpg` (profile close-up, text cropped off)
- **Style reference:** `lkf2_style.jpg` (wide-leg denim full-body)

**Brief**
> High-fashion editorial muse for LKF, a luxury fashion label. Glossy dark espresso-brown hair slicked tightly back with no parting into a long sleek low ponytail. Always wears a black guipure lace masquerade eye mask with an ornate filigree peak at the center of the forehead, open almond eye cutouts and a scalloped lower edge. Deep brown almond eyes, long lashes, smoky bronze eyeshadow, sharp dark brows, glossy deep crimson lipstick. Warm olive skin with a golden glow and real skin texture, sculpted cheekbones, strong elegant jawline. Slim athletic build, very tall, long legs. Photographed on a pure black background with a hard warm side key light and golden rim light, high-contrast chiaroscuro, 85mm lens, luxury campaign quality.

### ✅ Official sheet
- **Winner: Sheet 1, job ID `98a71d0f-522a-4085-b7fe-1ce808d32e58`** (2026-10-14)
- Reference media IDs: identity `ce7cb01f-682c-4f46-8a52-703478aa56d2` · style `5d19b58c-b18d-4ca6-870e-13d3b75a3ad8`
- Sheet candidates (2026-10-14): 1 `98a71d0f-522a-4085-b7fe-1ce808d32e58` · 2 `3aff6a75-3a43-40dc-a0ce-50e7615cb7c5` · 3 `58e1ed41-6c6f-4a1d-9092-b5e688a03cca` · 4 `21a14600-7f88-4a68-a4b9-a78ff5155d81`

---

## 3. Training-set prompts (Nano Banana Pro · 2k · batch 4)

Attach **her** official sheet + **her** identity close-up every time.

**Identity block**
> Photorealistic photograph of the exact same woman from the reference images, identical face and identical mask. Black guipure lace masquerade eye mask with an ornate filigree peak at the center of the forehead, open almond eye cutouts and a scalloped lower edge. Glossy dark espresso-brown hair slicked tightly back with no parting into a long sleek low ponytail. Deep brown eyes, sharp dark brows, long lashes, glossy deep crimson lips. Warm olive skin.

**Realism block**
> Shot on a full-frame camera, 85mm lens, natural skin texture with visible pores and fine peach fuzz, subtle film grain, true-to-life color, no airbrushing, no CGI or illustration look, no text, no logos.

| # | Ratio | Shot line |
|---|---|---|
| 1 | 4:5 | Straight-on head-and-shoulders portrait, neutral expression, looking directly into the lens, black turtleneck. Black background, warm hard side light, golden rim light. |
| 2 | 4:5 | Right side profile, chin lifted, ponytail visible down her back, black turtleneck. Black background, golden rim light tracing her profile and hair. |
| 3 | 4:5 | Three-quarter view turned to her left, eyes cutting sideways toward camera, lips closed. Black background, warm key light. |
| 4 | 3:4 | Waist-up, black scoop-neck tank top, one hand resting on the ponytail at the nape of her neck. Black background, warm side light. |
| 5 | 9:16 | Full-length, black scoop-neck tank, dark indigo high-waisted wide-leg jeans, black pointed heels, wide stance, looking over her shoulder. Black studio, golden rim light. |
| 6 | 9:16 | Full-length, walking toward camera mid-stride, long camel wool coat open over a black bodysuit, black boots. Black studio, warm spotlight, glow on the floor. |
| 7 | 3:4 | Waist-up, oversized black leather jacket, arms crossed, chin slightly down, intense gaze. Charcoal grey backdrop, soft warm studio light. |
| 8 | 9:16 | Full-length, leaning against a black wall, one knee bent, white fitted shirt tucked into black tailored trousers. Warm low-key light. |
| 9 | 4:5 | Close-up in soft diffused window daylight, neutral warm-beige wall, relaxed expression. |
| 10 | 3:4 | Night city street, three-quarter body under neon-warm shop lights, black trench coat, rain-wet pavement, shallow depth of field. |

Keep / delete rules: same as Muse I (`../LKF_MODEL_GUIDE.md` section 7). Watch especially for: **ponytail turning into a bun**, **eyes turning blue/green**, **skin lightening**, and **her face drifting toward Muse I**.

---

## 4. Soul ID training set (batch 1, 2026-10-14)

20 × Nano Banana Pro at 4k (80 credits), refs = official sheet + identity close-up. Mix: 8 close-ups · 7 waist-up · 5 full body · 7 non-black settings.

| # | Shot | Job ID |
|---|---|---|
| 1 | Front portrait, turtleneck, black | `aa691bff-966b-4526-910a-39db3d673f4f` |
| 2 | Right profile, ponytail | `ce62ab82-1051-4d79-a2e9-07f21cdac1d3` |
| 3 | ¾ left, eyes to camera | `d883cd52-bc26-4b35-82dc-dd9f22d27a5b` |
| 4 | Chin down, eyes up, top light | `bbf5f169-fbae-4c74-808d-d80c1e6074f8` |
| 5 | ¾ right smile, beige studio | `63cb6db1-1d44-4db7-a22f-03bfda63f416` |
| 6 | Window daylight close-up | `c17dfff2-c7af-4455-8889-03c0a2b75cb5` |
| 7 | Left profile, eyes closed | `5f094582-4cde-4472-8de6-94557dbbff7a` |
| 8 | Over the shoulder, backless dress | `9e3ca191-bd0a-4f19-a885-f5538b9f1bec` |
| 9 | Waist-up tank, hand on ponytail | `abdaa490-e85c-45ce-95d5-144da4c4f51a` |
| 10 | Leather jacket, grey backdrop | `46f7322a-0fd4-46be-b5df-c7401ff8929a` |
| 11 | Camel blazer, light grey studio | `6cabdf48-87c7-4d21-90f8-2b21b822d675` |
| 12 | Café, slip dress, daylight | `77af6e8a-c27f-4b77-bbae-774b2cffe46e` |
| 13 | Balcony, knit, golden hour | `755e3204-4509-4a1a-a8f6-1f12f4125dc4` |
| 14 | White shirt, touching mask | `650923a7-b7d2-4c09-9afb-20ecfb89bd97` |
| 15 | Night street, trench | `c910eb09-0a29-4741-9b18-64793db3f72a` |
| 16 | Full-length denim, over shoulder | `356d4d07-eecd-4da7-b898-6e89b38956f5` |
| 17 | Full-length walk, camel coat | `dbf4cbfe-7b45-457b-a960-2c89911f4163` |
| 18 | Full-length, leaning on wall | `5b47583e-c401-4ade-92ab-0f6cfdaf8b3a` |
| 19 | Full-length seated, red dress | `3119c21f-4eaa-4f3c-9f71-f02d4be5a5b2` |
| 20 | Full-length, daylight city street | `db35f426-bf94-4e38-bb40-0bf5f1d374a9` |
