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
- Winner: `________` (job ID) · Date: `________`
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
