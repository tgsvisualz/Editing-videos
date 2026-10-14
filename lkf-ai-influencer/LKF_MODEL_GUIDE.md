# LKF Muse: AI Influencer Bible (Higgsfield)

The one rulebook for generating the LKF masked model. Follow it exactly every time so she stays the same woman.

---

## 1. Who she is (identity lock)

| Element | Locked description, copy word for word |
|---|---|
| Face | European woman, adult (mid-20s look), oval face, high sculpted cheekbones, straight refined nose, full lips |
| Eyes | Ice-blue almond eyes, long defined lashes, warm bronze-brown smoky shadow |
| Lips | Glossy deep crimson / oxblood lipstick, always |
| Hair | Platinum blonde, wet-look, slicked tightly straight back into a sleek low bun, no loose strands, no fringe |
| Skin | Light skin with a luminous golden glow, real pore texture, light freckles on the nose |
| Signature mask | Black guipure lace masquerade eye mask, ornate filigree peak rising to the center of the forehead, open almond eye cutouts, scalloped lower edge over the cheekbones, sheer black mesh between the lace |
| Nails | Deep red, matching the lips |
| Body | Slim, very tall, long limbs, defined waist |

**Never changes:** mask, hair, lip colour, eye colour.
**Changes per post:** outfit, pose, framing, and sometimes the setting.

---

## 2. Character sheet settings (AI Influencer builder)

- **Tier:** Normal (not Bold)
- **Randomize / shuffle:** OFF
- Gender: Female · Ethnicity: European · Age: Adult
- Skin: Light · Hair: Long hair · Hair colour: Platinum
- Eyes: Ice blue, Almond
- Features: High cheekbones, Full lips · Distinctive: Big lashes
- Build: Slim · Height: Very tall · Proportions: Long limbs, Tiny waist
- Accessories: None (the brief adds the mask)
- **Identity image:** `lkf_identity.jpg` (close-up, LKF text cropped out)
- **Style reference:** `lkf_style.jpg` (fur-collar puffer shot)

**Brief:**
> High-fashion editorial muse for LKF, a luxury fashion label. Platinum blonde hair, wet-look, slicked tightly back into a sleek low bun, no loose strands. Always wears a black guipure lace masquerade eye mask with an ornate filigree peak at the center of the forehead, open almond eye cutouts and a scalloped lower edge. Ice-blue almond eyes, long defined lashes, warm bronze smoky shadow, glossy deep crimson lipstick, deep red nails. Light skin with a luminous golden glow and real skin texture. Photographed on a pure black background with a hard warm side key light and golden rim light, high-contrast chiaroscuro, 85mm lens, luxury campaign quality.

**After it generates:** pick the best sheet and record its seed here → `SEED: ________`
Don't rebuild the character after this point. Every new image comes from this sheet.

---

## 3. Shooting new content

### Option A: Soul ID (best consistency)
1. Generate 15–20 images of her from the sheet (mix of close-ups, ¾ shots and full body, different angles).
2. Delete any image where the face, mask or hair drifted.
3. Train a **Soul ID** on the keepers.
4. Generate with **Higgsfield Soul 2.0**, with that Soul ID selected, at 2k quality.

### Option B: Reference images (quick)
Use **Nano Banana Pro**. Attach the character sheet and `lkf_identity.jpg` to every generation.

### Master prompt template
Only the bracketed parts change. Everything else stays word for word.

```
LKF muse: platinum blonde hair slicked tightly back into a sleek low bun,
black guipure lace masquerade eye mask with filigree forehead peak,
ice-blue eyes, glossy deep crimson lips, deep red nails.
Wearing [OUTFIT].
[POSE + FRAMING].
[SETTING — default: pure black studio background],
hard warm side key light, golden rim light on skin and hair,
high-contrast chiaroscuro, 85mm, luxury fashion campaign, real skin texture.
```

### Ready-to-use shots
1. **Hero close-up:** "tight beauty close-up, face turned ¾ to camera left, eyes glancing up past the lens, lips slightly parted" (4:5)
2. **Jacket drop:** "glossy cream cropped puffer jacket with oversized white faux-fur shawl collar, black high-waisted pleated trousers / mid-stride, one hand gripping the fur collar at the neck, looking off-camera" (3:4)
3. **Full-length:** "full body, standing tall, weight on one hip, arms relaxed, shot from slightly low angle" (9:16)
4. **Over the shoulder:** "back to camera, head turned over the shoulder toward the lens, mask in sharp focus" (4:5)
5. **Detail / product:** "waist-up, hands framing the garment, face partly cropped at the top of the frame, focus on the fabric" (4:5)

### Aspect ratios
- Feed: **4:5** · Stories / Reels / TikTok: **9:16** · Web hero banners: **3:4** or **16:9**

---

## 4. Quality checklist (check before posting)

- [ ] Mask: filigree peak centered on the forehead, scalloped bottom edge, eyes visible through the cutouts
- [ ] Hair: platinum, slicked back, no flyaways or loose waves
- [ ] Lips: crimson and glossy, not pink or brown
- [ ] Eyes: ice blue
- [ ] Background: black or deep shadow, warm golden light
- [ ] Hands: 5 fingers, red nails, no merged fingers
- [ ] No unwanted text or logos in the image (add branding later in editing)

Any box unchecked → regenerate. Don't post near-misses: drift adds up and the character stops being recognizable.

---

## 5. Rules that keep her consistent

1. **Copy, don't rewrite.** Paste the identity line exactly the same in every prompt. Changing "slicked back bun" to "sleek updo" is enough to change her.
2. **Change one or two things per shot.** Outfit plus pose is fine. Outfit, location, lighting and camera angle all at once means drift.
3. **Never leave a builder trait blank.** Blank traits get randomized.
4. **Keep text out of reference images.** Add "LKF", "SHOP THE DROP" etc. afterwards in your editor.
5. **Keep a "golden set."** Save your 5 best images and reuse them as references when a new shot drifts.
6. **Same seed for variations.** To tweak one shot, keep the seed and change just one word.
7. **Video:** animate a finished still (image-to-video) instead of generating video from text, so the face stays locked.

---

## 6. Brand look (for posts and ads)

- Palette: black `#000000`, warm ivory text `#E8E0D6`, crimson accent `#8B0A14`, golden skin highlight
- Type: tall high-contrast serif for "L K F" with wide letter-spacing, italic serif for the tagline, monospace for CTAs (`[ SHOP THE DROP ]`)
- Tagline: *Limited drops. Online only.* · lkfashion.ca
