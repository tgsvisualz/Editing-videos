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

### ✅ Official sheet (locked)
- **Winner:** Sheet 1, job ID `a5b605ef-db52-4a62-8efa-fe9bee7a38c0` (2026-10-14)
- [View sheet](https://d8j0ntlcm91z4.cloudfront.net/user_39RDb4wrKRTZ3kBNp7tSgdxydbo/hf_20261014_060945_a5b605ef-db52-4a62-8efa-fe9bee7a38c0.png)
- Reference media IDs: identity close-up `c0d2cef2-3c10-434e-913f-83db6f492fbe` · style shot `ddddc36c-8011-47db-b334-232729986536`
- **Known drift to correct:** the sheet shows a centre parting. Always write "slicked tightly straight back with **no parting**".
- The sheet is on white. That's normal for sheets; the black background and golden light come from each shot's prompt.

Don't rebuild the character after this point. Every new image comes from this sheet.

---

## 3. Shooting new content

### Option A: Soul ID (best consistency)
1. Generate 15–20 images of her from the sheet (mix of close-ups, ¾ shots and full body, different angles).
2. Delete any image where the face, mask or hair drifted.
3. Train a **Soul ID** on the keepers.
4. Generate with **Higgsfield Soul 2.0**, with that Soul ID selected, at 2k quality.

### Option B: Reference images (quick, ~2 credits/image)
Use **Nano Banana Pro** at 2k. Attach the official sheet (job `a5b605ef-…`) **and** the identity close-up (`c0d2cef2-…`) to every generation.

### Master prompt template
Only the bracketed parts change. Everything else stays word for word.

```
The exact same woman from the reference images, identical face and identical mask.
LKF muse: platinum blonde hair slicked tightly straight back with no parting, sleek low bun,
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

---

## 7. Building the Soul ID training set (batches of 4)

**Settings for every batch:** Nano Banana Pro · 2k · batch 4 · references: official sheet (job `a5b605ef-…`) + identity close-up (`c0d2cef2-…`).
Paste the **identity block**, then the **shot line**, then the **realism block**.

**Identity block**
> Photorealistic photograph of the exact same woman from the reference images, identical face and identical mask. Black guipure lace masquerade eye mask with an ornate filigree peak at the center of the forehead, open almond eye cutouts and a scalloped lower edge. Platinum blonde hair, wet-look, slicked tightly straight back with no parting into a sleek low bun, no loose strands. Ice-blue eyes, long lashes, glossy deep crimson lips, deep red nails.

**Realism block**
> Shot on a full-frame camera, 85mm lens, natural skin texture with visible pores and fine peach fuzz, subtle film grain, true-to-life color, no airbrushing, no CGI or illustration look, no text, no logos.

| # | Ratio | Shot line |
|---|---|---|
| 1 | 4:5 | Straight-on head-and-shoulders portrait, neutral expression, looking directly into the lens, bare shoulders. Pure black background, warm hard side light, golden rim light. |
| 2 | 4:5 | Left side profile portrait, chin slightly raised, lips slightly parted. Black background, warm rim light tracing her profile. |
| 3 | 4:5 | Three-quarter view turned to her right, eyes glancing back at camera, faint closed-lip smile. Black background, warm key light. |
| 4 | 4:5 | Over-the-shoulder portrait, back to camera in a black backless satin dress, head turned toward the lens. Black background, golden rim light on her shoulder. |
| 5 | 3:4 | Waist-up, black tailored blazer worn with nothing underneath, gold hoop earrings, hand touching the edge of the mask. Soft warm studio light on a charcoal grey backdrop. |
| 6 | 3:4 | Waist-up, glossy cream cropped puffer with oversized white faux-fur collar, both hands pulling the collar up around her neck. Black background, warm side light. |
| 7 | 9:16 | Full-length, walking toward camera mid-stride, black satin slip dress and black pointed heels. Black studio, warm spotlight from above, soft glow on the floor. |
| 8 | 9:16 | Full-length, seated sideways on a black velvet chair, legs crossed, black wide-leg trousers and a cream silk blouse. Warm low-key light, black background. |
| 9 | 4:5 | Close-up in soft diffused daylight from a large window, neutral warm-grey wall, relaxed expression. |
| 10 | 3:4 | Night street, standing under a warm streetlamp, long black wool coat, wet pavement reflections, shallow depth of field. |

**Keep / delete rules:** keep only images where mask, hair (no parting), crimson lips, ice-blue eyes and hands are all correct. Aim for 20–25 keepers: ~40% close-ups, ~35% waist-up, ~25% full body, with at least 4 that aren't on a black background. Then train the Soul ID.

---

## 8. Video ad: "The Shoot" (studio walk-in + camera flashes)

Make the **start frame** as a still image first, then animate it (image-to-video). Starting from her still keeps her face and mask locked; text-to-video drifts.

### Step 1: Start frame (Nano Banana Pro · 4k · 9:16 · refs: official sheet + identity close-up)
```
Photorealistic photograph of the exact same woman from the reference images, identical face and identical mask. Black guipure lace masquerade eye mask with an ornate filigree peak at the center of the forehead, open almond eye cutouts and a scalloped lower edge. Platinum blonde hair, wet-look, slicked tightly straight back with no parting into a sleek low bun. Ice-blue eyes, long lashes, glossy deep crimson lips, deep red nails. Tall slim model wearing a black satin plunging-neckline slip dress and black pointed stiletto heels. Full-length, standing at the edge of a high-end professional photo studio on a seamless black backdrop, one foot stepping forward onto a glossy black floor, confident, sultry expression. Large softbox and beauty-dish lights on stands at the sides of the frame, warm golden key light, subtle haze in the air. Shot on a full-frame cinema camera, 35mm lens, natural skin texture, true-to-life color, luxury fashion campaign, no text, no logos.
```

### Step 2: Animate (image-to-video · 9:16 · 8–10 s · use the still as the first frame)
```
Luxury fashion campaign ad. The masked model walks slowly into the center of a professional photo studio with a confident runway stride, hips swaying, heels clicking on the glossy black floor. She stops on her mark, plants one hip, rolls her shoulders back and turns her face toward the camera with a sultry, self-assured look. She holds a series of editorial poses: hand on hip, chin lifted; a three-quarter turn looking over her shoulder; one hand lightly touching the edge of her lace mask. Bright white photographer camera flashes burst repeatedly from off-camera left and right, each flash briefly lighting her skin, the satin dress and the lace mask, with sharp highlights and quick shadows, like a live high-fashion photo shoot. Slow cinematic push-in from full body to a waist-up shot as she poses. Warm golden ambient studio light between flashes, subtle haze, shallow depth of field. Her face, mask, platinum slicked-back bun and crimson lips stay consistent throughout. Photorealistic, smooth natural motion, 24fps film look.
```

**Tips**
- Video model: pick a high-quality image-to-video model in Higgsfield (Kling / Veo / Seedance class). Run 2–4 takes and keep the best.
- If the flashes are too weak, add: "intense strobe flashes, flashes pop every half second".
- If she walks too fast or poses too many times, cut the pose list down to 2.
- Add the LKF logo, "Limited drops. Online only." and "[ SHOP THE DROP ] lkfashion.ca" in your editor on the last 2 seconds. Don't put text in the generation prompt.
- Sound: camera shutter clicks + flash pops over a slow, deep bass track.
