import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌸 Seeding PREP Education Inspired Course Content...");

  // ล้างข้อมูลเก่าก่อน Seeding
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE "User", "Course", "Module", "Lesson", "Quiz", "Question", "QuizOption" CASCADE;`,
  );

  const passwordHash = await bcrypt.hash("AdminPassword123!", 12);

  // ---------------------------------------------------------------------------
  // 1. USERS SEED
  // ---------------------------------------------------------------------------
  await prisma.user.create({
    data: {
      email: "admin@redsakura.com",
      firstName: "Sakura",
      lastName: "Admin",
      passwordHash,
      role: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      email: "student@redsakura.com",
      firstName: "Student",
      lastName: "User",
      passwordHash,
      role: "USER",
    },
  });

  // ---------------------------------------------------------------------------
  // 2. COURSE 1: PREP ENGLISH - GRAMMAR & VOCABULARY MASTERCLASS
  // ---------------------------------------------------------------------------
  const englishCourse = await prisma.course.create({
    data: {
      title: "PREP English: Complete Grammar, Tenses & Workplace Vocabulary",
      slug: "prep-english-masterclass",
      description:
        "คอร์สภาษาอังกฤษสไตล์ PREP Education เน้นไวยากรณ์ครบทั้ง 12 Tenses, PREP Framework, Word Families และคำศัพท์การทำงานในชีวิตประจำวัน",
      category: "English",
      level: "BEGINNER",
      published: true,
    },
  });

  // Module 1: Comprehensive Grammar & All 12 Tenses
  const engMod1 = await prisma.module.create({
    data: {
      courseId: englishCourse.id,
      title: "Module 1: Grammar Foundations & All 12 Tenses",
      description:
        "เจาะลึกโครงสร้างไวยากรณ์ภาษาอังกฤษและ Tenses ทั้งหมดแบบ Step-by-Step",
      order: 1,
    },
  });

  const tensesLessons = [
    {
      title: "1. Present Simple Tense",
      slug: "present-simple-tense",
      content: `
      <div class="space-y-6 font-sans text-slate-800 leading-relaxed">
        <!-- I. Introduction -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">I. Simple Present Tense คืออะไร?</h3>
          <p class="text-slate-700">
            <strong>Simple Present Tense</strong> เป็นกาลปัจจุบันอย่างง่ายที่ใช้บอกเล่าเหตุการณ์ที่เกิดขึ้นเป็นประจำ ความจริง นิสัย หรือสิ่งที่เป็นจริงเสมอ
          </p>
          <div class="mt-3 p-4 bg-rose-50/60 border border-rose-100 rounded-2xl">
            <h5 class="font-bold text-rose-950 text-sm mb-2">หลักการใช้ Present Simple Tense มีดังนี้:</h5>
            <ul class="list-disc pl-5 text-sm space-y-1 text-slate-700">
              <li><strong>ความจริงทั่วไป</strong> (General truths)</li>
              <li><strong>นิสัยและกิจวัตรประจำวัน</strong> (Habits and routines)</li>
              <li><strong>ข้อเท็จจริงที่ไม่เปลี่ยนแปลง</strong> (Facts)</li>
              <li><strong>ตารางเวลา</strong> (Schedules)</li>
              <li><strong>ความสามารถและคุณสมบัติ</strong> (Abilities and characteristics)</li>
            </ul>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- II. Sentence Structures -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">II. โครงสร้างของ Simple Present Tense</h3>

          <!-- 1. Affirmative -->
          <div class="mb-6">
            <h4 class="text-lg font-bold text-slate-900 mb-2">1. ประโยคบอกเล่า (Affirmative Sentences)</h4>
            <div class="p-3 bg-slate-100 rounded-xl font-mono text-xs text-rose-900 font-semibold mb-3">
              I / You / We / They + Verb (infinitive)<br/>
              He / She / It + Verb + s/es
            </div>

            <h5 class="font-bold text-slate-800 text-sm mb-2">กฎการเติม s/es:</h5>
            <div class="overflow-x-auto mb-4">
              <table class="w-full border-collapse border border-slate-200 text-sm">
                <thead>
                  <tr class="bg-rose-50 text-rose-950 font-bold">
                    <th class="border border-slate-200 p-3 text-left w-1/3">กรณี</th>
                    <th class="border border-slate-200 p-3 text-left w-1/3">กฎ</th>
                    <th class="border border-slate-200 p-3 text-left w-1/3">ตัวอย่าง</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  <tr class="hover:bg-slate-50">
                    <td class="border border-slate-200 p-3 font-medium">กริยาทั่วไป</td>
                    <td class="border border-slate-200 p-3 text-rose-800 font-semibold">เติม s</td>
                    <td class="border border-slate-200 p-3 font-mono">work → works, play → plays</td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="border border-slate-200 p-3 font-medium">ลงท้าย s, x, z, ch, sh, o</td>
                    <td class="border border-slate-200 p-3 text-rose-800 font-semibold">เติม es</td>
                    <td class="border border-slate-200 p-3 font-mono">watch → watches, go → goes</td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="border border-slate-200 p-3 font-medium">ลงท้าย พยัญชนะ + y</td>
                    <td class="border border-slate-200 p-3 text-rose-800 font-semibold">เปลี่ยน y เป็น ies</td>
                    <td class="border border-slate-200 p-3 font-mono">study → studies, cry → cries</td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="border border-slate-200 p-3 font-medium">ลงท้าย สระ + y</td>
                    <td class="border border-slate-200 p-3 text-rose-800 font-semibold">เติม s</td>
                    <td class="border border-slate-200 p-3 font-mono">play → plays, enjoy → enjoys</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p class="font-bold text-sm text-slate-800 mb-1">ตัวอย่างประโยคบอกเล่า:</p>
            <ul class="list-disc pl-6 text-sm space-y-1 text-slate-700">
              <li><strong>I work at a bank.</strong> <em>(ฉันทำงานที่ธนาคาร)</em></li>
              <li><strong>She works at a bank.</strong> <em>(เธอทำงานที่ธนาคาร)</em></li>
              <li><strong>They study English.</strong> <em>(พวกเขาเรียนภาษาอังกฤษ)</em></li>
              <li><strong>He studies English.</strong> <em>(เขาเรียนภาษาอังกฤษ)</em></li>
            </ul>
          </div>

          <!-- 2. Negative -->
          <div class="mb-6">
            <h4 class="text-lg font-bold text-slate-900 mb-2">2. ประโยคปฏิเสธ (Negative Sentences)</h4>
            <div class="p-3 bg-slate-100 rounded-xl font-mono text-xs text-rose-900 font-semibold mb-3">
              I / You / We / They + do not (don't) + Verb (infinitive)<br/>
              He / She / It + does not (doesn't) + Verb (infinitive)
            </div>

            <p class="font-bold text-sm text-slate-800 mb-1">ตัวอย่างประโยคปฏิเสธ:</p>
            <ul class="list-disc pl-6 text-sm space-y-1 text-slate-700">
              <li><strong>I don't like coffee.</strong> <em>(ฉันไม่ชอบกาแฟ)</em></li>
              <li><strong>She doesn't like coffee.</strong> <em>(เธอไม่ชอบกาแฟ)</em></li>
              <li><strong>We don't watch TV.</strong> <em>(เราไม่ดูทีวี)</em></li>
              <li><strong>He doesn't watch TV.</strong> <em>(เขาไม่ดูทีวี)</em></li>
            </ul>
          </div>

          <!-- 3. Interrogative -->
          <div class="mb-6">
            <h4 class="text-lg font-bold text-slate-900 mb-2">3. ประโยคคำถาม (Interrogative Sentences)</h4>
            <div class="p-3 bg-slate-100 rounded-xl font-mono text-xs text-rose-900 font-semibold mb-3">
              Do + I / you / we / they + Verb (infinitive)?<br/>
              Does + he / she / it + Verb (infinitive)?
            </div>

            <p class="font-bold text-sm text-slate-800 mb-1">ตัวอย่างประโยคคำถาม:</p>
            <ul class="list-disc pl-6 text-sm space-y-1 text-slate-700">
              <li><strong>Do you speak English?</strong> <em>(คุณพูดภาษาอังกฤษไหม)</em></li>
              <li><strong>Does she speak English?</strong> <em>(เธอพูดภาษาอังกฤษไหม)</em></li>
              <li><strong>Do they live here?</strong> <em>(พวกเขาอยู่ที่นี่ไหม)</em></li>
              <li><strong>Does he live here?</strong> <em>(เขาอยู่ที่นี่ไหม)</em></li>
            </ul>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- III. Usage -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">III. การใช้งาน Simple Present Tense</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-2">1. ความจริงทั่วไปและข้อเท็จจริง</h5>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-600">
                <li><strong>The sun rises in the east.</strong> <em>(ดวงอาทิตย์ขึ้นทางทิศตะวันออก)</em></li>
                <li><strong>Water boils at 100 degrees Celsius.</strong> <em>(น้ำเดือดที่ 100 องศาเซลเซียส)</em></li>
                <li><strong>The Earth revolves around the sun.</strong> <em>(โลกโคจรรอบดวงอาทิตย์)</em></li>
              </ul>
            </div>

            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-2">2. นิสัยและกิจวัตรประจำวัน</h5>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-600">
                <li><strong>I wake up at 6 AM every day.</strong> <em>(ฉันตื่นนอน 6 โมงเช้าทุกวัน)</em></li>
                <li><strong>She exercises three times a week.</strong> <em>(เธอออกกำลังกายสามครั้งต่อสัปดาห์)</em></li>
                <li><strong>They have dinner at 7 PM.</strong> <em>(พวกเขาทานอาหารเย็นตอน 7 โมงเย็น)</em></li>
              </ul>
            </div>

            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-2">3. ตารางเวลาและกำหนดการ</h5>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-600">
                <li><strong>The train leaves at 9:00 AM.</strong> <em>(รถไฟออก 9 โมงเช้า)</em></li>
                <li><strong>The movie starts at 8 PM.</strong> <em>(หนังเริ่มตอน 8 โมงเย็น)</em></li>
                <li><strong>School begins in September.</strong> <em>(โรงเรียนเปิดในเดือนกุมภาพันธ์/กันยายน)</em></li>
              </ul>
            </div>

            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-2">4. ความสามารถและคุณสมบัติ</h5>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-600">
                <li><strong>He speaks three languages.</strong> <em>(เขาพูดได้สามภาษา)</em></li>
                <li><strong>She plays the piano.</strong> <em>(เธอเล่นเปียโน)</em></li>
                <li><strong>I understand French.</strong> <em>(ฉันเข้าใจภาษาฝรั่งเศส)</em></li>
              </ul>
            </div>
          </div>

          <div class="mt-4 p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
            <h5 class="font-bold text-slate-900 text-sm mb-2">5. ความคิดเห็นและความรู้สึก</h5>
            <ul class="list-disc pl-5 text-xs space-y-1 text-slate-600">
              <li><strong>I love chocolate.</strong> <em>(ฉันรักช็อกโกแลต)</em></li>
              <li><strong>She hates spicy food.</strong> <em>(เธอเกลียดอาหารเผ็ด)</em></li>
              <li><strong>We believe in honesty.</strong> <em>(เราเชื่อในความซื่อสัตย์)</em></li>
            </ul>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- IV. Adverbs of Frequency -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">IV. คำที่ใช้กับ Simple Present Tense (Adverbs of Frequency)</h3>
          
          <div class="overflow-x-auto mb-4">
            <table class="w-full border-collapse border border-slate-200 text-sm">
              <thead>
                <tr class="bg-rose-50 text-rose-950 font-bold">
                  <th class="border border-slate-200 p-3 text-left w-1/4">ความถี่ (%)</th>
                  <th class="border border-slate-200 p-3 text-left w-1/4">คำกริยาวิเศษณ์</th>
                  <th class="border border-slate-200 p-3 text-left w-1/2">ตัวอย่างประโยค</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold text-emerald-700">100%</td>
                  <td class="border border-slate-200 p-3 font-bold text-rose-800">always</td>
                  <td class="border border-slate-200 p-3">I always brush my teeth.</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold text-emerald-600">80-90%</td>
                  <td class="border border-slate-200 p-3 font-bold text-rose-800">usually</td>
                  <td class="border border-slate-200 p-3">She usually walks to work.</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold text-blue-600">60-70%</td>
                  <td class="border border-slate-200 p-3 font-bold text-rose-800">often</td>
                  <td class="border border-slate-200 p-3">They often eat out.</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold text-amber-600">40-50%</td>
                  <td class="border border-slate-200 p-3 font-bold text-rose-800">sometimes</td>
                  <td class="border border-slate-200 p-3">He sometimes reads books.</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold text-orange-600">20-30%</td>
                  <td class="border border-slate-200 p-3 font-bold text-rose-800">rarely</td>
                  <td class="border border-slate-200 p-3">We rarely watch TV.</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold text-rose-600">10%</td>
                  <td class="border border-slate-200 p-3 font-bold text-rose-800">seldom</td>
                  <td class="border border-slate-200 p-3">She seldom drinks coffee.</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold text-red-700">0%</td>
                  <td class="border border-slate-200 p-3 font-bold text-rose-800">never</td>
                  <td class="border border-slate-200 p-3">I never smoke.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="p-4 bg-slate-100 rounded-2xl border border-slate-200">
            <h5 class="font-bold text-slate-800 text-sm mb-2">📌 คำบอกเวลาอื่นๆ ที่เจอบ่อย:</h5>
            <ul class="list-disc pl-6 text-xs text-slate-700 space-y-1">
              <li><strong>every day / week / month / year</strong></li>
              <li><strong>once / twice a week</strong></li>
              <li><strong>on Mondays</strong></li>
              <li><strong>in the morning / afternoon / evening</strong></li>
              <li><strong>at night</strong></li>
            </ul>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- V. Conjugation Rules -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">V. กฎการผันกริยาใน Simple Present Tense</h3>
          
          <div class="space-y-4">
            <div class="p-4 border border-rose-100 rounded-2xl bg-rose-50/30">
              <h5 class="font-bold text-slate-900 text-sm mb-1">1. กฎทั่วไป</h5>
              <p class="text-xs text-slate-700 leading-relaxed">
                • <strong>I, We, You, They</strong> + คำนามพหูพจน์: <span class="text-rose-800 font-semibold">ใช้กริยารูปฐาน (V.1 ไม่ต้องเติมอะไร)</span><br/>
                • <strong>He, She, It</strong> + คำนามเอกพจน์/นับไม่ได้: <span class="text-rose-800 font-semibold">เติม s หรือ es ที่คำกริยา</span>
              </p>
            </div>

            <div>
              <h5 class="font-bold text-slate-900 text-sm mb-2">2. กฎเฉพาะสำหรับบุรุษที่สามเอกพจน์ (He, She, It)</h5>
              <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-slate-200 text-sm">
                  <thead>
                    <tr class="bg-slate-100 text-slate-800 font-bold">
                      <th class="border border-slate-200 p-3 text-left w-1/2">กฎการเติม</th>
                      <th class="border border-slate-200 p-3 text-left w-1/4">ตัวอย่างเดิม</th>
                      <th class="border border-slate-200 p-3 text-left w-1/4">การผัน</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200">
                    <tr class="hover:bg-slate-50">
                      <td class="border border-slate-200 p-3">กริยาลงท้ายด้วย <strong>o, ch, sh, x, s</strong></td>
                      <td class="border border-slate-200 p-3 font-mono text-xs">go, teach, brush, mix, kiss</td>
                      <td class="border border-slate-200 p-3 font-mono text-xs text-rose-800 font-bold">goes, teaches, brushes, mixes, kisses</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="border border-slate-200 p-3">กริยาลงท้ายด้วย <strong>y</strong> (หน้า y เป็นพยัญชนะ)</td>
                      <td class="border border-slate-200 p-3 font-mono text-xs">study, try, cry</td>
                      <td class="border border-slate-200 p-3 font-mono text-xs text-rose-800 font-bold">studies, tries, cries</td>
                    </tr>
                    <tr class="hover:bg-slate-50">
                      <td class="border border-slate-200 p-3">กริยาทั่วไป</td>
                      <td class="border border-slate-200 p-3 font-mono text-xs">work, play, read</td>
                      <td class="border border-slate-200 p-3 font-mono text-xs text-rose-800 font-bold">works, plays, reads</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      `,
      summary: "ใช้บอกเรื่องที่เป็นจริงเสมอและกิจกรรมประจำวัน",
    },
    {
      title: "2. Present Continuous Tense & Active Status",
      slug: "present-continuous-tense",
      content: `<div class="space-y-6 font-sans text-slate-800 leading-relaxed">
        <!-- I. Introduction -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">I. Present Continuous Tense คืออะไร?</h3>
          <p class="text-slate-700">
            <strong>Present Continuous Tense</strong> (หรือ <em>Present Progressive Tense</em>) คือกาลที่ใช้บอกเหตุการณ์หรือการกระทำที่กำลังดำเนินอยู่ในขณะที่พูด หรือกำลังเกิดขึ้นในช่วงเวลาปัจจุบัน แม้จะไม่ได้เกิดขึ้นในขณะนั้นพอดีก็ตาม
          </p>
          
          <div class="mt-3 p-4 bg-rose-50/60 border border-rose-100 rounded-2xl">
            <h5 class="font-bold text-rose-950 text-sm mb-2">ลักษณะเด่นของ Present Continuous Tense:</h5>
            <ul class="list-disc pl-5 text-sm space-y-1 text-slate-700">
              <li>เน้นความต่อเนื่องของการกระทำที่ยังไม่เสร็จสิ้น</li>
              <li>บอกการกระทำที่เกิดขึ้นเป็นการชั่วคราว</li>
              <li>แสดงถึงการเปลี่ยนแปลงหรือแนวโน้มที่กำลังเกิด</li>
              <li>ใช้กับแผนการหรือการนัดหมายในอนาคตอันใกล้</li>
            </ul>
          </div>

          <p class="font-bold text-sm text-slate-800 mt-4 mb-1">ตัวอย่างเบื้องต้น:</p>
          <ul class="list-disc pl-6 text-sm space-y-1 text-slate-700">
            <li><strong>She is reading a book now.</strong> <em>(เธอกำลังอ่านหนังสืออยู่ตอนนี้)</em></li>
            <li><strong>They are studying English at the moment.</strong> <em>(พวกเขากำลังเรียนภาษาอังกฤษอยู่ในขณะนี้)</em></li>
            <li><strong>I am working on a new project.</strong> <em>(ฉันกำลังทำโครงการใหม่อยู่)</em></li>
          </ul>
        </div>

        <hr class="border-rose-100" />

        <!-- II. Sentence Structures -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">II. โครงสร้างประโยค Present Continuous Tense</h3>
          <p class="text-sm text-slate-600 mb-4">
            หลักการใช้ขึ้นอยู่กับโครงสร้างพื้นฐานที่ต้องมี <code class="bg-rose-50 text-rose-800 px-2 py-0.5 rounded font-semibold">Verb to be (am / is / are)</code> และกริยาเติม <code class="bg-rose-50 text-rose-800 px-2 py-0.5 rounded font-semibold">-ing</code> เสมอ
          </p>

          <!-- 1. Affirmative -->
          <div class="mb-6">
            <h4 class="text-lg font-bold text-slate-900 mb-2">1. ประโยคบอกเล่า (Affirmative Sentences)</h4>
            <div class="overflow-x-auto mb-4">
              <table class="w-full border-collapse border border-slate-200 text-sm">
                <thead>
                  <tr class="bg-rose-50 text-rose-950 font-bold">
                    <th class="border border-slate-200 p-3 text-left w-1/4">ประเภทประธาน</th>
                    <th class="border border-slate-200 p-3 text-left w-1/3">โครงสร้าง</th>
                    <th class="border border-slate-200 p-3 text-left w-1/2">ตัวอย่างประโยค</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  <tr class="hover:bg-slate-50">
                    <td class="border border-slate-200 p-3 font-semibold">I</td>
                    <td class="border border-slate-200 p-3 font-mono text-xs text-rose-800 font-bold">I + am + V.ing</td>
                    <td class="border border-slate-200 p-3">I am reading a book.</td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="border border-slate-200 p-3 font-semibold">He / She / It</td>
                    <td class="border border-slate-200 p-3 font-mono text-xs text-rose-800 font-bold">He/She/It + is + V.ing</td>
                    <td class="border border-slate-200 p-3">She is cooking dinner.</td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="border border-slate-200 p-3 font-semibold">We / You / They</td>
                    <td class="border border-slate-200 p-3 font-mono text-xs text-rose-800 font-bold">We/You/They + are + V.ing</td>
                    <td class="border border-slate-200 p-3">They are playing football.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 2. Negative -->
          <div class="mb-6">
            <h4 class="text-lg font-bold text-slate-900 mb-2">2. ประโยคปฏิเสธ (Negative Sentences)</h4>
            <div class="p-3 bg-slate-100 rounded-xl font-mono text-xs text-rose-900 font-semibold mb-3">
              Subject + am / is / are + not + Verb.ing
            </div>
            <ul class="list-disc pl-6 text-sm space-y-1 text-slate-700">
              <li><strong>I am not studying now.</strong> <em>(ฉันไม่ได้กำลังเรียนตอนนี้)</em></li>
              <li><strong>She is not working today.</strong> <em>(เธอไม่ได้ทำงานวันนี้)</em></li>
              <li><strong>They are not coming to the party.</strong> <em>(พวกเขาจะไม่มางานปาร์ตี้)</em></li>
            </ul>
          </div>

          <!-- 3. Interrogative -->
          <div class="mb-6">
            <h4 class="text-lg font-bold text-slate-900 mb-2">3. ประโยคคำถาม (Interrogative Sentences)</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
                <h5 class="font-bold text-slate-900 text-sm mb-1">Yes / No Questions</h5>
                <p class="font-mono text-xs text-rose-800 font-bold mb-2">Am / Is / Are + Subject + V.ing?</p>
                <p class="text-xs text-slate-600"><strong>Are you watching TV?</strong> <em>(คุณกำลังดูทีวีอยู่ไหม?)</em></p>
              </div>
              <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
                <h5 class="font-bold text-slate-900 text-sm mb-1">Wh- Questions</h5>
                <p class="font-mono text-xs text-rose-800 font-bold mb-2">Wh-word + am / is / are + Subject + V.ing?</p>
                <p class="text-xs text-slate-600"><strong>What are you doing?</strong> <em>(คุณกำลังทำอะไรอยู่?)</em></p>
              </div>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- III. Rules for Adding -ing -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">III. กฎการเติม -ing ให้กับกริยา</h3>

          <!-- Rule 1 -->
          <div class="mb-6">
            <h4 class="text-lg font-bold text-slate-900 mb-2">1. กฎทั่วไป: เติม -ing ตรงๆ</h4>
            <p class="text-xs text-slate-600 mb-2">ใช้กับคำกริยาส่วนใหญ่ที่ไม่มีข้อยกเว้น</p>
            <div class="overflow-x-auto mb-2">
              <table class="w-full border-collapse border border-slate-200 text-sm">
                <thead>
                  <tr class="bg-rose-50 text-rose-950 font-bold">
                    <th class="border border-slate-200 p-2.5 text-left w-1/4">Base Form</th>
                    <th class="border border-slate-200 p-2.5 text-left w-1/4">-ing Form</th>
                    <th class="border border-slate-200 p-2.5 text-left w-1/2">ตัวอย่างประโยค</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 text-xs">
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">play</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">playing</td><td class="border border-slate-200 p-2.5">They are playing football. <em>(พวกเขากำลังเล่นฟุตบอล)</em></td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">read</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">reading</td><td class="border border-slate-200 p-2.5">She is reading a magazine. <em>(เธอกำลังอ่านนิตยสาร)</em></td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">work</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">working</td><td class="border border-slate-200 p-2.5">I am working from home. <em>(ฉันกำลังทำงานจากบ้าน)</em></td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">watch</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">watching</td><td class="border border-slate-200 p-2.5">We are watching TV. <em>(เรากำลังดูทีวี)</em></td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">listen</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">listening</td><td class="border border-slate-200 p-2.5">He is listening to music. <em>(เขากำลังฟังเพลง)</em></td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">study</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">studying</td><td class="border border-slate-200 p-2.5">They are studying English. <em>(พวกเขากำลังเรียนภาษาอังกฤษ)</em></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Rule 2 -->
          <div class="mb-6">
            <h4 class="text-lg font-bold text-slate-900 mb-2">2. กริยาลงท้ายด้วย e: ตัด e แล้วเติม -ing</h4>
            <div class="overflow-x-auto mb-2">
              <table class="w-full border-collapse border border-slate-200 text-sm">
                <thead>
                  <tr class="bg-rose-50 text-rose-950 font-bold">
                    <th class="border border-slate-200 p-2.5 text-left w-1/4">Base Form</th>
                    <th class="border border-slate-200 p-2.5 text-left w-1/4">-ing Form</th>
                    <th class="border border-slate-200 p-2.5 text-left w-1/2">ตัวอย่างประโยค</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 text-xs">
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">write</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">writing</td><td class="border border-slate-200 p-2.5">She is writing a letter. <em>(เธอกำลังเขียนจดหมาย)</em></td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">make</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">making</td><td class="border border-slate-200 p-2.5">I am making dinner. <em>(ฉันกำลังทำอาหารเย็น)</em></td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">take</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">taking</td><td class="border border-slate-200 p-2.5">He is taking a shower. <em>(เขากำลังอาบน้ำ)</em></td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">come</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">coming</td><td class="border border-slate-200 p-2.5">They are coming soon. <em>(พวกเขากำลังจะมาเร็วๆ นี้)</em></td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">dance</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">dancing</td><td class="border border-slate-200 p-2.5">She is dancing beautifully. <em>(เธอกำลังเต้นอย่างสวยงาม)</em></td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">drive</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">driving</td><td class="border border-slate-200 p-2.5">He is driving to work. <em>(เขากำลังขับรถไปทำงาน)</em></td></tr>
                </tbody>
              </table>
            </div>
            <div class="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-xs text-amber-900">
              <strong>⚠️ ข้อยกเว้น:</strong> กริยาที่ลงท้ายด้วย <code class="font-bold">-ee, -oe, -ye</code> ไม่ต้องตัด e เช่น 
              <em>see → seeing</em>, <em>agree → agreeing</em>, <em>dye → dyeing</em>
            </div>
          </div>

          <!-- Rule 3 -->
          <div class="mb-6">
            <h4 class="text-lg font-bold text-slate-900 mb-2">3. กริยา 1 พยางค์ (พยัญชนะ-สระ-พยัญชนะ / CVC): เพิ่มตัวท้ายอีก 1 ตัว</h4>
            <div class="overflow-x-auto mb-2">
              <table class="w-full border-collapse border border-slate-200 text-sm">
                <thead>
                  <tr class="bg-rose-50 text-rose-950 font-bold">
                    <th class="border border-slate-200 p-2.5 text-left w-1/4">Base Form</th>
                    <th class="border border-slate-200 p-2.5 text-left w-1/4">-ing Form</th>
                    <th class="border border-slate-200 p-2.5 text-left w-1/2">ตัวอย่างประโยค</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 text-xs">
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">run</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">running</td><td class="border border-slate-200 p-2.5">He is running in the park. <em>(เขากำลังวิ่งอยู่ในสวน)</em></td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">sit</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">sitting</td><td class="border border-slate-200 p-2.5">She is sitting on the chair. <em>(เธอกำลังนั่งอยู่บนเก้าอี้)</em></td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">swim</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">swimming</td><td class="border border-slate-200 p-2.5">They are swimming in the pool. <em>(พวกเขากำลังว่ายน้ำในสระ)</em></td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">stop</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">stopping</td><td class="border border-slate-200 p-2.5">The bus is stopping here. <em>(รถบัสกำลังจอดที่นี่)</em></td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">get</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">getting</td><td class="border border-slate-200 p-2.5">I am getting ready. <em>(ฉันกำลังเตรียมตัว)</em></td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-mono">plan</td><td class="border border-slate-200 p-2.5 font-mono text-rose-800 font-bold">planning</td><td class="border border-slate-200 p-2.5">We are planning a trip. <em>(เรากำลังวางแผนการเดินทาง)</em></td></tr>
                </tbody>
              </table>
            </div>
            <div class="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-xs text-amber-900">
              <strong>⚠️ ข้อยกเว้น:</strong> ถ้าลงท้ายด้วย <code class="font-bold">w, x, y</code> ไม่ต้องซ้ำตัวท้าย เช่น 
              <em>snow → snowing</em>, <em>fix → fixing</em>, <em>play → playing</em>
            </div>
          </div>

          <!-- Rule 4 & 5 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-2">4. ลงท้ายด้วย -ie: เปลี่ยน ie เป็น y แล้วเติม -ing</h5>
              <ul class="text-xs space-y-1 text-slate-700 font-mono">
                <li>• lie → <span class="text-rose-800 font-bold">lying</span> (He is lying on the bed.)</li>
                <li>• die → <span class="text-rose-800 font-bold">dying</span> (The plant is dying.)</li>
                <li>• tie → <span class="text-rose-800 font-bold">tying</span> (She is tying her shoes.)</li>
              </ul>
            </div>

            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-2">5. ลงท้ายด้วย -ic: เติม k แล้วเติม -ing</h5>
              <ul class="text-xs space-y-1 text-slate-700 font-mono">
                <li>• picnic → <span class="text-rose-800 font-bold">picnicking</span> (They are picnicking by the lake.)</li>
                <li>• panic → <span class="text-rose-800 font-bold">panicking</span> (Don't panic, everything is fine.)</li>
              </ul>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- IV. Comprehensive Usage -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">IV. บริบทและกรณีการใช้งาน Present Continuous Tense</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-2">1. กำลังเกิดขึ้นในขณะที่พูด</h5>
              <p class="text-xs text-slate-500 mb-2">คำบอกเวลา: now, right now, at the moment, currently</p>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-700">
                <li>I am typing an email right now.</li>
                <li>Look! It is raining outside.</li>
                <li>Listen! Someone is knocking at the door.</li>
              </ul>
            </div>

            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-2">2. เกิดขึ้นในช่วงเวลาปัจจุบัน (ไม่จำเป็นต้องทำขณะพูด)</h5>
              <p class="text-xs text-slate-500 mb-2">คำบอกเวลา: these days, this week, this month, nowadays</p>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-700">
                <li>I am reading a great book this week.</li>
                <li>She is taking a cooking class this month.</li>
                <li>We are working on a new project these days.</li>
              </ul>
            </div>

            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-2">3. การกระทำที่เกิดขึ้นชั่วคราว</h5>
              <p class="text-xs text-slate-500 mb-2">คำบอกเวลา: temporarily, for now, for the time being</p>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-700">
                <li>I am living in Bangkok temporarily.</li>
                <li>She is working from home for now.</li>
                <li>We are staying at a hotel for a few days.</li>
              </ul>
            </div>

            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-2">4. การเปลี่ยนแปลงหรือแนวโน้มที่กำลังเกิด</h5>
              <p class="text-xs text-slate-500 mb-2">กริยาพบบ่อย: getting, becoming, growing, changing, rising</p>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-700">
                <li>The weather is getting colder.</li>
                <li>Technology is changing rapidly.</li>
                <li>His English is improving quickly.</li>
              </ul>
            </div>

            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-2">5. แผนการหรือการนัดหมายในอนาคตอันใกล้</h5>
              <p class="text-xs text-slate-500 mb-2">คำบอกเวลาอนาคต: tonight, tomorrow, next week, this weekend</p>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-700">
                <li>I am meeting my friend for dinner tonight.</li>
                <li>She is flying to Singapore next week.</li>
                <li>We are having a party this Saturday.</li>
              </ul>
            </div>

            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-2">6. แสดงความรำคาญ (การกระทำซ้ำๆ บ่อยเกินไป)</h5>
              <p class="text-xs text-slate-500 mb-2">คำบอกความถี่: always, constantly, continually, forever</p>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-700">
                <li>He is always complaining about his job.</li>
                <li>She is constantly checking her phone.</li>
                <li>You are always losing your keys.</li>
              </ul>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- V. Time Indicators -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">V. คำบอกเวลาและกริยาดึงดูดความสนใจ (Indicators)</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 class="font-bold text-slate-900 text-sm mb-2">1. คำวิเศษณ์บอกเวลา (Adverbs of time)</h5>
              <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-slate-200 text-sm">
                  <thead>
                    <tr class="bg-rose-50 text-rose-950 font-bold">
                      <th class="border border-slate-200 p-2 text-left">คำสัญญาณ</th>
                      <th class="border border-slate-200 p-2 text-left">ตัวอย่างประโยค</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 text-xs">
                    <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2 font-bold text-rose-800">Now</td><td class="border border-slate-200 p-2">It is raining now.</td></tr>
                    <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2 font-bold text-rose-800">Right now</td><td class="border border-slate-200 p-2">I am studying English right now.</td></tr>
                    <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2 font-bold text-rose-800">At the moment</td><td class="border border-slate-200 p-2">I am not listening to Spotify at the moment.</td></tr>
                    <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2 font-bold text-rose-800">At present</td><td class="border border-slate-200 p-2">At present she's working abroad.</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h5 class="font-bold text-slate-900 text-sm mb-2">2. คำกริยาดึงดูดความสนใจ (Attention Verbs)</h5>
              <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-slate-200 text-sm">
                  <thead>
                    <tr class="bg-slate-100 text-slate-800 font-bold">
                      <th class="border border-slate-200 p-2 text-left">คำอุทาน/กริยา</th>
                      <th class="border border-slate-200 p-2 text-left">ตัวอย่างประโยค</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 text-xs">
                    <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2 font-bold text-slate-900">Look! / Watch!</td><td class="border border-slate-200 p-2">Look! The singer is showing up.</td></tr>
                    <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2 font-bold text-slate-900">Listen!</td><td class="border border-slate-200 p-2">Listen! The singer is singing.</td></tr>
                    <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2 font-bold text-slate-900">Keep silent!</td><td class="border border-slate-200 p-2">Keep silent! The baby is sleeping.</td></tr>
                    <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2 font-bold text-slate-900">Watch out! / Look out!</td><td class="border border-slate-200 p-2">Watch out! The yellow car is coming.</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>`,
      summary: "ใช้บอกสิ่งที่กำลังเกิดขึ้น ณ ตอนนี้",
    },
    {
      title: "3. Present Perfect Tense & Life Achievements",
      slug: "present-perfect-tense",
      content: `<div class="space-y-6 font-sans text-slate-800 leading-relaxed">
        <!-- I. Introduction -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">I. Present Perfect Tense คืออะไร?</h3>
          <p class="text-slate-700">
            <strong>Present Perfect Tense</strong> คือรูปประโยคภาษาอังกฤษที่ใช้เชื่อมเหตุการณ์ในอดีตเข้ากับปัจจุบัน โดยแสดงว่าเหตุการณ์นั้นยังมีผลกระทบ หรือมีความสำคัญอยู่ในขณะนี้ โครงสร้างพื้นฐานคือ <code class="bg-rose-50 text-rose-800 px-2 py-0.5 rounded font-semibold">Subject + have/has + กริยาช่อง 3 (V.3 / Past Participle)</code>
          </p>
          
          <div class="mt-4 p-4 bg-rose-50/60 border border-rose-100 rounded-2xl space-y-3">
            <h5 class="font-bold text-rose-950 text-sm">1. Present Perfect Tense หมายถึงอะไร?</h5>
            <p class="text-xs text-slate-700 leading-relaxed">
              ใช้บรรยายเหตุการณ์ที่เริ่มในอดีตและยัง "เกี่ยว" กับตอนนี้ — อาจเป็นเพราะยังไม่สิ้นสุด ยังให้ผลอยู่ หรือเป็นประสบการณ์ที่ติดตัวมาถึงปัจจุบัน ลองมองเป็นเส้นเวลา: จุดเริ่มต้นอยู่ในอดีต ลากเส้นยาวมาถึง "NOW" และยังไม่ตัด
            </p>
            <p class="text-xs text-slate-700">
              • <strong>I have studied at this school for 2 years.</strong> <em>(ฉันเรียนที่โรงเรียนนี้มา 2 ปีแล้ว — เริ่มเรียน 2 ปีก่อน และยังเรียนอยู่ ณ ตอนนี้)</em><br/>
              <span class="text-slate-500">*(เปรียบเทียบ: หากใช้ Simple Past ว่า "I studied at this school for 2 years" จะหมายความว่าเรียนจบและออกจากโรงเรียนนั้นไปแล้ว)*</span>
            </p>
          </div>

          <!-- Thai Interference Warning Box -->
          <div class="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl text-xs text-amber-950 space-y-2">
            <h5 class="font-bold text-amber-900 text-sm">⚠️ 2. ทำไมคนไทยถึงสับสนกับ Present Perfect?</h5>
            <p class="leading-relaxed">
              ภาษาไทยแสดงเวลาผ่านคำบอกเวลาเช่น <em>"แล้ว / เคย / เพิ่ง / กำลัง"</em> โดยไม่เปลี่ยนรูปกริยา (กริยา "กิน" ยังคงเป็น "กิน" เสมอ) ปรากฏการณ์นี้เรียกว่า <strong>L1 Interference</strong> คือสมองเผลอลากโครงสร้างภาษาแม่ทับลงไป
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div class="p-2.5 bg-white rounded-xl border border-amber-200">
                <p class="font-semibold text-slate-800">"ฉันกินข้าวแล้ว"</p>
                <p class="text-red-600 line-through">❌ I ate already.</p>
                <p class="text-emerald-700 font-bold">✅ I have already eaten.</p>
              </div>
              <div class="p-2.5 bg-white rounded-xl border border-amber-200">
                <p class="font-semibold text-slate-800">"เขาเคยไปญี่ปุ่น"</p>
                <p class="text-red-600 line-through">❌ He went to Japan before.</p>
                <p class="text-emerald-700 font-bold">✅ He has been to Japan.</p>
              </div>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- II. Sentence Structures -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">II. โครงสร้างประโยค Present Perfect Tense</h3>
          
          <div class="overflow-x-auto mb-6">
            <table class="w-full border-collapse border border-slate-200 text-sm">
              <thead>
                <tr class="bg-rose-50 text-rose-950 font-bold">
                  <th class="border border-slate-200 p-3 text-left w-1/4">รูปประโยค</th>
                  <th class="border border-slate-200 p-3 text-left w-1/3">สูตรโครงสร้าง</th>
                  <th class="border border-slate-200 p-3 text-left w-1/2">ตัวอย่างประโยค</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold">บอกเล่า (Positive)</td>
                  <td class="border border-slate-200 p-3 font-mono text-xs text-rose-800 font-bold">S + have/has + V.3</td>
                  <td class="border border-slate-200 p-3">I have finished my homework. <br/><span class="text-xs text-slate-500">(ฉันทำการบ้านเสร็จแล้ว)</span></td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold">ปฏิเสธ (Negative)</td>
                  <td class="border border-slate-200 p-3 font-mono text-xs text-rose-800 font-bold">S + haven't/hasn't + V.3</td>
                  <td class="border border-slate-200 p-3">She hasn't eaten lunch yet. <br/><span class="text-xs text-slate-500">(เธอยังไม่ได้กินข้าวกลางวัน)</span></td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold">คำถาม (Question)</td>
                  <td class="border border-slate-200 p-3 font-mono text-xs text-rose-800 font-bold">Have/Has + S + V.3?</td>
                  <td class="border border-slate-200 p-3">Have you ever tried som tum? <br/><span class="text-xs text-slate-500">(คุณเคยลองกินส้มตำไหม?)</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Auxiliary Selection Table -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-2">1. การเลือกใช้ HAVE และ HAS</h5>
              <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-slate-200 text-xs">
                  <thead>
                    <tr class="bg-slate-100 font-bold">
                      <th class="border border-slate-200 p-2 text-left">ประธาน (Subject)</th>
                      <th class="border border-slate-200 p-2 text-left">Auxiliary Verb</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td class="border border-slate-200 p-2 font-semibold">I / You / We / They</td><td class="border border-slate-200 p-2 text-rose-800 font-bold">HAVE</td></tr>
                    <tr><td class="border border-slate-200 p-2 font-semibold">He / She / It</td><td class="border border-slate-200 p-2 text-rose-800 font-bold">HAS</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm text-xs space-y-2">
              <h5 class="font-bold text-slate-900 text-sm">2. คำตอบสั้น (Short Answers)</h5>
              <p class="text-slate-600">
                ใช้อย่างเป็นธรรมชาติโดยลงท้ายแค่ auxiliary:
              </p>
              <p>• <strong>Yes, I have.</strong> / <strong>No, I haven't.</strong></p>
              <p>• <strong>Yes, she has.</strong> / <strong>No, she hasn't.</strong></p>
              <p class="text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                💡 หลีกเลี่ยงการตอบยาวซ้ำคำกริยา เช่น "Yes, I have finished." เพราะฟังVerbose ไม่เป็นธรรมชาติ
              </p>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- III. 4 Scenarios -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">III. Present Perfect ใช้ในสถานการณ์ไหนบ้าง? (4 เคสหลัก)</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Case 1 -->
            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <div class="flex items-center gap-2 mb-2">
                <span class="flex h-6 w-6 items-center justify-center rounded-full bg-rose-800 text-white text-xs font-bold">1</span>
                <h5 class="font-bold text-slate-900 text-sm">ต่อเนื่องถึงปัจจุบัน</h5>
              </div>
              <p class="text-xs text-slate-500 mb-2">คู่กับ: for / since</p>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-700">
                <li>I have studied at this school for 3 years. <br/><em>(ยังคงเรียนอยู่ที่นี่ตอนนี้)</em></li>
                <li>She has worked at PREP since 2023. <br/><em>(ยังทำงานอยู่ที่นี่จนถึงตอนนี้)</em></li>
              </ul>
            </div>

            <!-- Case 2 -->
            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <div class="flex items-center gap-2 mb-2">
                <span class="flex h-6 w-6 items-center justify-center rounded-full bg-rose-800 text-white text-xs font-bold">2</span>
                <h5 class="font-bold text-slate-900 text-sm">ประสบการณ์ในชีวิต</h5>
              </div>
              <p class="text-xs text-slate-500 mb-2">คู่กับ: ever / never</p>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-700">
                <li>I have tried som tum, but I don't like it. <br/><em>(เคยลองแล้ว — ไม่สนใจว่าเมื่อไหร่)</em></li>
                <li>He has never eaten Japanese food. <br/><em>(ไม่เคยเลยในชีวิต)</em></li>
              </ul>
            </div>

            <!-- Case 3 -->
            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <div class="flex items-center gap-2 mb-2">
                <span class="flex h-6 w-6 items-center justify-center rounded-full bg-rose-800 text-white text-xs font-bold">3</span>
                <h5 class="font-bold text-slate-900 text-sm">เพิ่งเกิด ยังส่งผลถึงตอนนี้</h5>
              </div>
              <p class="text-xs text-slate-500 mb-2">คู่กับ: just / already</p>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-700">
                <li>He has just finished watching a series. <br/><em>(เพิ่งจบ — ยังอินอยู่)</em></li>
                <li>I have already submitted my assignment. <br/><em>(ส่งไปแล้ว — ตอนนี้ไม่ต้องทำอีก)</em></li>
              </ul>
            </div>

            <!-- Case 4 -->
            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <div class="flex items-center gap-2 mb-2">
                <span class="flex h-6 w-6 items-center justify-center rounded-full bg-rose-800 text-white text-xs font-bold">4</span>
                <h5 class="font-bold text-slate-900 text-sm">ทำซ้ำ ช่วงยังไม่จบ</h5>
              </div>
              <p class="text-xs text-slate-500 mb-2">คู่กับ: many times / twice</p>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-700">
                <li>She has called me three times today. <br/><em>(โทรมา 3 ครั้งแล้ว และวันนี้ยังไม่หมดวัน)</em></li>
                <li>We have visited Paris many times. <br/><em>(ไปมาหลายรอบแล้ว)</em></li>
              </ul>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- IV. Time Expressions -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">IV. คำเชื่อมเวลา (Time Expressions) ที่ใช้กับ Present Perfect</h3>

          <!-- For vs Since -->
          <div class="mb-6">
            <h4 class="text-lg font-bold text-slate-900 mb-2">1. FOR และ SINCE</h4>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse border border-slate-200 text-sm">
                <thead>
                  <tr class="bg-rose-50 text-rose-950 font-bold">
                    <th class="border border-slate-200 p-2.5 text-left w-1/6">คำ</th>
                    <th class="border border-slate-200 p-2.5 text-left w-1/3">ตามด้วย</th>
                    <th class="border border-slate-200 p-2.5 text-left w-1/4">ความหมาย</th>
                    <th class="border border-slate-200 p-2.5 text-left w-1/3">ตัวอย่าง</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 text-xs">
                  <tr class="hover:bg-slate-50">
                    <td class="border border-slate-200 p-2.5 font-bold text-rose-800">for</td>
                    <td class="border border-slate-200 p-2.5">ช่วงเวลา (Duration)</td>
                    <td class="border border-slate-200 p-2.5">เป็นเวลา...</td>
                    <td class="border border-slate-200 p-2.5 font-mono">for 3 years, for 30 minutes</td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="border border-slate-200 p-2.5 font-bold text-rose-800">since</td>
                    <td class="border border-slate-200 p-2.5">จุดเริ่มต้น (Point in time)</td>
                    <td class="border border-slate-200 p-2.5">ตั้งแต่...</td>
                    <td class="border border-slate-200 p-2.5 font-mono">since 2020, since Monday</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Ever / Never / Already / Yet / Just -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm text-xs">
              <h5 class="font-bold text-slate-900 text-sm mb-1">2. EVER และ NEVER (ประสบการณ์)</h5>
              <p class="mb-1">• <strong>ever:</strong> ใช้ในคำถาม <em>"Have you ever eaten durian?"</em></p>
              <p className="mb-2">• <strong>never:</strong> แปลว่า "ไม่เคย" ไม่ต้องใส่ not ซ้ำ <em>"I have never been to Japan."</em></p>
              <p class="text-red-600 bg-red-50 p-2 rounded border border-red-200">
                ❌ I have not never been there. (ห้ามใช้ Double Negative)
              </p>
            </div>

            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm text-xs">
              <h5 class="font-bold text-slate-900 text-sm mb-1">3. ALREADY, YET และ JUST</h5>
              <p class="mb-1">• <strong>already:</strong> ทำแล้วเรียบร้อย (วางหน้า V.3) <em>"She has already finished."</em></p>
              <p class="mb-1">• <strong>yet:</strong> ยังไม่ทำ (วางท้ายประโยคปฏิเสธ/คำถาม) <em>"I haven't eaten yet."</em></p>
              <p class="mb-1">• <strong>just:</strong> เพิ่งจะทำไม่นาน <em>"He has just arrived."</em></p>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- V. Present Perfect vs Simple Past -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">V. Present Perfect กับ Simple Past ต่างกันอย่างไร?</h3>
          
          <div class="overflow-x-auto mb-6">
            <table class="w-full border-collapse border border-slate-200 text-sm">
              <thead>
                <tr class="bg-rose-50 text-rose-950 font-bold">
                  <th class="border border-slate-200 p-3 text-left w-1/3">Present Perfect (PP)</th>
                  <th class="border border-slate-200 p-3 text-left w-1/3">Simple Past (SP)</th>
                  <th class="border border-slate-200 p-3 text-left w-1/3">จุดต่างสำคัญ</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-xs">
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3">I have eaten Thai food. <br/><em>(เคยกิน — ไม่ระบุเวลา)</em></td>
                  <td class="border border-slate-200 p-3">I ate Thai food yesterday. <br/><em>(กินเมื่อวานนี้)</em></td>
                  <td class="border border-slate-200 p-3 font-semibold text-rose-800">PP = ประสบการณ์ / SP = บอกเวลาแน่นอน</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3">She has lived here for 5 years. <br/><em>(ยังคงอยู่ตอนนี้)</em></td>
                  <td class="border border-slate-200 p-3">She lived here for 5 years. <br/><em>(ย้ายออกไปแล้ว)</em></td>
                  <td class="border border-slate-200 p-3 font-semibold text-rose-800">PP = ยังต่อเนื่อง / SP = สิ้นสุดลงแล้ว</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3">I have just finished my exam. <br/><em>(เพิ่งเสร็จ — ยังอินอยู่)</em></td>
                  <td class="border border-slate-200 p-3">I finished my exam at 3 pm. <br/><em>(เสร็จเมื่อตอนบ่าย 3 โมง)</em></td>
                  <td class="border border-slate-200 p-3 font-semibold text-rose-800">PP = เพิ่งเกิด / SP = ระบุเวลาชัดเจน</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Definite Time Markers Caution -->
          <div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs space-y-2">
            <h5 class="font-bold text-rose-950 text-sm">📌 คำบอกเวลาเฉพาะเจาะจง (Definite Time Markers) บังคับใช้ Simple Past เสมอ:</h5>
            <p className="text-slate-700">
              เมื่อมีคำเหล่านี้ในประโยค <u>ห้ามใช้ Present Perfect เด็ดขาด</u>:
            </p>
            <div class="flex flex-wrap gap-2 pt-1">
              <span class="bg-white border border-rose-200 px-2.5 py-1 rounded-lg font-mono font-bold text-rose-900">yesterday</span>
              <span class="bg-white border border-rose-200 px-2.5 py-1 rounded-lg font-mono font-bold text-rose-900">... ago (2 days ago)</span>
              <span class="bg-white border border-rose-200 px-2.5 py-1 rounded-lg font-mono font-bold text-rose-900">last ... (last week)</span>
              <span class="bg-white border border-rose-200 px-2.5 py-1 rounded-lg font-mono font-bold text-rose-900">in 2020 / in January</span>
              <span class="bg-white border border-rose-200 px-2.5 py-1 rounded-lg font-mono font-bold text-rose-900">when I was ...</span>
            </div>
          </div>
        </div>
      </div>`,
    },
    {
      title: "4. Present Perfect Continuous Tense",
      slug: "present-perfect-continuous-tense",
      content: `<div class="space-y-6 font-sans text-slate-800 leading-relaxed">
        <!-- I. Introduction -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">I. Present Perfect Continuous Tense คืออะไร?</h3>
          <p class="text-slate-700">
            <strong>Present Perfect Continuous</strong> เป็น Tense ที่ใช้แสดงการกระทำที่เริ่มขึ้นในอดีตและยังคงดำเนินต่อเนื่องมาจนถึงปัจจุบัน หรือเพิ่งสิ้นสุดลงไปไม่นานและยังมีผลกระทบ/หลักฐานปรากฏในปัจจุบัน โดยจะเน้นที่ <em>ระยะเวลา (Duration)</em> และ <em>กระบวนการ (Process)</em> ของการกระทำเป็นหลัก
          </p>

          <div class="mt-4 p-4 bg-rose-50/60 border border-rose-100 rounded-2xl">
            <h5 class="font-bold text-rose-950 text-sm mb-2">💡 ตัวอย่างสถานการณ์:</h5>
            <ul class="list-disc pl-5 text-sm space-y-1 text-slate-700">
              <li><strong>คุณเรียนภาษาอังกฤษมา 3 ปีแล้วและตอนนี้ก็ยังเรียนอยู่:</strong> <br/><span class="text-rose-900 font-semibold">→ I have been studying English for three years.</span></li>
              <li><strong>คุณเพิ่งวิ่งเสร็จ ตอนนี้เหนื่อยและเหงื่อออกมาก:</strong> <br/><span class="text-rose-900 font-semibold">→ I have been running.</span> <em>(อธิบายสาเหตุว่าทำไมถึงเหนื่อย ณ ตอนนี้)</em></li>
            </ul>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- II. Structure & Formulas -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">II. โครงสร้างประโยค Present Perfect Continuous</h3>
          
          <div class="overflow-x-auto mb-6">
            <table class="w-full border-collapse border border-slate-200 text-sm">
              <thead>
                <tr class="bg-rose-50 text-rose-950 font-bold">
                  <th class="border border-slate-200 p-3 text-left w-1/4">ประเภทประโยค</th>
                  <th class="border border-slate-200 p-3 text-left w-1/3">โครงสร้าง</th>
                  <th class="border border-slate-200 p-3 text-left w-1/2">ตัวอย่างประโยค</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold">ประโยคบอกเล่า</td>
                  <td class="border border-slate-200 p-3 font-mono text-xs text-rose-800 font-bold">S + have/has + been + V.ing</td>
                  <td class="border border-slate-200 p-3">She has been working for two hours. <br/><span class="text-xs text-slate-500">(เธอทำงานมาสองชั่วโมงแล้ว)</span></td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold">ประโยคปฏิเสธ</td>
                  <td class="border border-slate-200 p-3 font-mono text-xs text-rose-800 font-bold">S + have/has + not + been + V.ing</td>
                  <td class="border border-slate-200 p-3">They haven't been studying. <br/><span class="text-xs text-slate-500">(พวกเขาไม่ได้เรียนมาเลย)</span></td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold">ประโยคคำถาม (Yes/No)</td>
                  <td class="border border-slate-200 p-3 font-mono text-xs text-rose-800 font-bold">Have/Has + S + been + V.ing?</td>
                  <td class="border border-slate-200 p-3">Have you been waiting long? <br/><span class="text-xs text-slate-500">(คุณรออยู่นานหรือยัง?)</span></td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold">ประโยคคำถาม (Wh-)</td>
                  <td class="border border-slate-200 p-3 font-mono text-xs text-rose-800 font-bold">Wh- + have/has + S + been + V.ing?</td>
                  <td class="border border-slate-200 p-3">How long has she been working here? <br/><span class="text-xs text-slate-500">(เธอทำงานที่นี่มานานแค่ไหนแล้ว?)</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="p-4 bg-slate-100 rounded-2xl border border-slate-200">
            <h5 class="font-bold text-slate-900 text-sm mb-1">📌 สูตรการใช้งานคำบอกเวลา:</h5>
            <p class="font-mono text-xs text-rose-900 font-bold mb-2">Subject + have/has + been + Verb-ing + (for/since) + time expression</p>
            <ul class="list-disc pl-5 text-xs text-slate-700 space-y-1">
              <li><strong>I have been reading for three hours.</strong> <em>(ฉันอ่านหนังสือมาเป็นเวลา 3 ชั่วโมงแล้ว)</em></li>
              <li><strong>He has been working since morning.</strong> <em>(เขาทำงานมาตั้งแต่เช้า)</em></li>
              <li><strong>We have been waiting for 30 minutes.</strong> <em>(พวกเรารอมา 30 นาทีแล้ว)</em></li>
            </ul>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- III. When to Use -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">III. เมื่อไหร่ที่ใช้ Present Perfect Continuous?</h3>

          <div class="space-y-4">
            <!-- 1. Started in past, still continuing -->
            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h4 class="font-bold text-slate-900 text-sm mb-2">1. การกระทำที่เริ่มในอดีตและยังดำเนินอยู่ถึงปัจจุบัน</h4>
              <p class="text-xs text-slate-600 mb-2">เน้นว่าการกระทำนั้นเริ่มต้นตั้งแต่อดีต และขณะพูดก็ยังคงทำอยู่เรื่อยๆ</p>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-700 mb-3">
                <li><strong>I have been learning Spanish for six months.</strong> <em>(ฉันเรียนภาษาสเปนมา 6 เดือนแล้ว - และปัจจุบันก็ยังเรียนอยู่)</em></li>
                <li><strong>They have been living in this house since 2015.</strong> <em>(พวกเขาอาศัยอยู่ในบ้านหลังนี้มาตั้งแต่ปี 2015 - และปัจจุบันก็ยังอยู่)</em></li>
                <li><strong>She has been working at Google for three years.</strong> <em>(เธอทำงานที่ Google มา 3 ปีแล้ว - และยังคงทำงานอยู่)</em></li>
              </ul>

              <!-- For vs Since Box -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-rose-50/50 rounded-xl border border-rose-100 text-xs">
                <div>
                  <h6 class="font-bold text-rose-900 mb-1">FOR + ระยะเวลา (Duration)</h6>
                  <p class="text-slate-600 mb-1">บอกว่าทำมานานเท่าไรแล้ว:</p>
                  <ul class="list-disc pl-4 text-slate-700 space-y-0.5 font-mono">
                    <li>for three hours</li>
                    <li>for six months</li>
                    <li>for many years / for ages</li>
                  </ul>
                </div>
                <div>
                  <h6 class="font-bold text-rose-900 mb-1">SINCE + จุดเริ่มต้น (Starting Point)</h6>
                  <p class="text-slate-600 mb-1">บอกว่าทำมาตั้งแต่จุดเวลาไหน:</p>
                  <ul class="list-disc pl-4 text-slate-700 space-y-0.5 font-mono">
                    <li>since morning / since 9 o'clock</li>
                    <li>since 2010 / since 2020</li>
                    <li>since I met you / since yesterday</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- 2. Just stopped with present effect -->
            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h4 class="font-bold text-slate-900 text-sm mb-2">2. การกระทำที่เพิ่งจบลง และเห็นผลกระทบชัดเจนในปัจจุบัน</h4>
              <p class="text-xs text-slate-600 mb-2">การกระทำเพิ่งสิ้นสุดลง แต่ยังมีหลักฐานหรือผลลัพธ์หลงเหลือให้เห็นขณะพูด</p>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-700">
                <li><strong>I'm tired because I have been exercising.</strong> <em>(ฉันเหนื่อยเพราะเพิ่งออกกำลังกายมา)</em></li>
                <li><strong>The ground is wet. It has been raining.</strong> <em>(พื้นเปียก ฝนเพิ่งตกมาแน่ๆ)</em></li>
                <li><strong>Her eyes are red. She has been crying.</strong> <em>(ตาเธอแดงมาก เธอเพิ่งร้องไห้มาแน่เลย)</em></li>
                <li><strong>You look exhausted. What have you been doing?</strong> <em>(คุณดูเหนื่อยล้ามาก ไปทำอะไรมา?)</em></li>
              </ul>
            </div>

            <!-- 3. Emphasize duration -->
            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h4 class="font-bold text-slate-900 text-sm mb-2">3. เน้นระยะเวลาและความต่อเนื่องของการกระทำ</h4>
              <p class="text-xs text-slate-600 mb-2">ใช้เมื่อผู้พูดต้องการเน้นย้ำว่าการกระทำนั้นใช้เวลานานหรือทำอย่างต่อเนื่องจริงๆ</p>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-700">
                <li><strong>We have been waiting for the bus for an hour!</strong> <em>(พวกรอรถเมล์มาเป็นชั่วโมงแล้วนะ! - เน้นว่านานมาก)</em></li>
                <li><strong>He has been playing video games all day.</strong> <em>(เขาเล่นเกมมาทั้งวันแล้ว - เน้นความต่อเนื่องตลอดวัน)</em></li>
                <li><strong>I have been trying to call you since yesterday.</strong> <em>(ฉันพยายามโทรหาคุณมาตั้งแต่เมื่อวานแล้วนะ)</em></li>
              </ul>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- IV. Time Phrases -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">IV. คำบอกเวลาที่ใช้กับ Present Perfect Continuous</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-2">lately / recently (ช่วงนี้ / เมื่อเร็วๆ นี้)</h5>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-700">
                <li><strong>I've been feeling tired lately.</strong> <em>(ช่วงนี้ฉันรู้สึกเหนื่อยๆ อยู่เรื่อยเลย)</em></li>
                <li><strong>Have you been seeing anyone recently?</strong> <em>(ช่วงนี้คุณได้เจอใครบ้างไหม?)</em></li>
              </ul>
            </div>

            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-2">all day / all morning / all week (ตลอดทั้ง...)</h5>
              <ul class="list-disc pl-5 text-xs space-y-1 text-slate-700">
                <li><strong>He's been studying all morning.</strong> <em>(เขาอ่านหนังสือมาตลอดทั้งเช้าเลย)</em></li>
                <li><strong>It has been raining all day.</strong> <em>(ฝนตกมาตลอดทั้งวัน)</em></li>
                <li><strong>They have been traveling all week.</strong> <em>(พวกเขาเดินทางท่องเที่ยวมาตลอดทั้งสัปดาห์)</em></li>
              </ul>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- V. Comparison Table -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">V. เปรียบเทียบ Present Perfect Continuous กับ Tense อื่นๆ</h3>
          
          <div class="overflow-x-auto mb-6">
            <table class="w-full border-collapse border border-slate-200 text-sm">
              <thead>
                <tr class="bg-rose-50 text-rose-950 font-bold">
                  <th class="border border-slate-200 p-3 text-left w-1/4">Tense</th>
                  <th class="border border-slate-200 p-3 text-left w-1/4">โครงสร้าง</th>
                  <th class="border border-slate-200 p-3 text-left w-1/4">เน้นการใช้งาน</th>
                  <th class="border border-slate-200 p-3 text-left w-1/4">ตัวอย่างประโยค</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-xs">
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-bold text-rose-900">Present Perfect Continuous</td>
                  <td class="border border-slate-200 p-3 font-mono">have/has been + V.ing</td>
                  <td class="border border-slate-200 p-3 font-semibold text-rose-800">เน้นความต่อเนื่อง & ระยะเวลา</td>
                  <td class="border border-slate-200 p-3">She has been working for hours. <br/><em>(เธอทำงานต่อเนื่องมาหลายชั่วโมงแล้ว)</em></td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-bold text-slate-900">Present Perfect</td>
                  <td class="border border-slate-200 p-3 font-mono">have/has + V.3</td>
                  <td class="border border-slate-200 p-3 font-semibold text-emerald-800">เน้นการเสร็จสิ้น & ผลลัพธ์</td>
                  <td class="border border-slate-200 p-3">She has finished her work. <br/><em>(เธอทำงานเสร็จสมบูรณ์แล้ว)</em></td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-bold text-slate-900">Present Continuous</td>
                  <td class="border border-slate-200 p-3 font-mono">am/is/are + V.ing</td>
                  <td class="border border-slate-200 p-3 font-semibold text-blue-800">เน้นสิ่งที่กำลังทำอยู่ ณ ตอนนี้</td>
                  <td class="border border-slate-200 p-3">She is working now. <br/><em>(เธอกำลังทำงานอยู่ ณ ขณะนี้)</em></td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-bold text-slate-900">Simple Present</td>
                  <td class="border border-slate-200 p-3 font-mono">V.1 / V.(s,es)</td>
                  <td class="border border-slate-200 p-3 font-semibold text-slate-700">เน้นความเป็นจริงทั่วไป & นิสัย</td>
                  <td class="border border-slate-200 p-3">She works every day. <br/><em>(เธอทำงานทุกๆ วัน)</em></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Stative Verbs Caution Box (From PREP Infographic) -->
          <div class="p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
            <h5 class="font-bold text-red-900 text-sm mb-2 flex items-center gap-1.5">
              <span>⚠️</span> ข้อควรระวัง: Present Perfect Continuous กับ Stative Verbs
            </h5>
            <p class="text-xs text-slate-700 leading-relaxed mb-3">
              <strong>Stative Verbs</strong> (กริยาแสดงสภาวะ ความรู้สึก ความคิด การรับรู้ เช่น <em>know, love, believe, understand, seem, own</em>) <u>ห้ามนำมาใช้ในรูป Continuous (-ing) เด็ดขาด</u> แม้ว่าจะต้องการบอกระยะเวลาก็ตาม
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 bg-white rounded-xl border border-red-200">
                <p class="font-bold text-red-600 mb-1">❌ ตัวอย่างที่ผิด (Incorrect):</p>
                <p class="font-mono text-slate-800 font-semibold line-through">I have been knowing him for years.</p>
                <p class="text-[11px] text-slate-500 mt-1">เหตุผล: 'know' เป็น Stative Verb ไม่ใช้รูป Continuous</p>
              </div>

              <div class="p-3 bg-white rounded-xl border border-emerald-200">
                <p class="font-bold text-emerald-600 mb-1">✅ การแก้ไขที่ถูกต้อง (Correct):</p>
                <p class="font-mono text-slate-800 font-semibold">I have known him for years.</p>
                <p class="text-[11px] text-slate-500 mt-1">เหตุผล: ใช้ Present Perfect Simple แทนเมื่อต้องการบอกระยะเวลาสภาวะ</p>
              </div>
            </div>
          </div>
        </div>
      </div>`,
      summary: "เน้นระยะเวลาที่กระทำต่อเนื่องมาจากอดีตจนถึงปัจจุบัน",
    },
    {
      title: "5. Past Simple Tense",
      slug: "past-simple-tense",
      content: `<div class="space-y-4 font-sans text-slate-800 leading-relaxed">
        <h3 class="text-xl font-bold text-rose-900">Past Simple Tense คืออะไร?</h3>
        <p>
          <strong>Past simple tense</strong> คือ กาลที่ใช้บอกเหตุการณ์หรือการกระทำที่เกิดขึ้นและเสร็จสิ้นในอดีต โดยไม่มีความเกี่ยวข้องหรือผลต่อเนื่องกับปัจจุบัน เป็นกาลที่ใช้เล่าเรื่องราว บอกประสบการณ์ และอธิบายเหตุการณ์ที่ผ่านไปแล้ว
        </p>

        <h4 class="text-lg font-bold text-slate-900 mt-6">ความหมายและการใช้งาน:</h4>
        <p>
          Past simple คือ กาลที่เน้นว่าเหตุการณ์นั้นเกิดขึ้นและจบลงในอดีตอย่างสมบูรณ์ มักมีคำบอกเวลาที่ชัดเจน เช่น 
          <code class="bg-rose-50 text-rose-800 px-2 py-0.5 rounded font-semibold">yesterday</code> (เมื่อวาน), 
          <code class="bg-rose-50 text-rose-800 px-2 py-0.5 rounded font-semibold">last week</code> (สัปดาห์ที่แล้ว), 
          <code class="bg-rose-50 text-rose-800 px-2 py-0.5 rounded font-semibold">in 2020</code> (ในปี 2020), 
          <code class="bg-rose-50 text-rose-800 px-2 py-0.5 rounded font-semibold">ago</code> (มาแล้ว)
        </p>

        <h4 class="text-lg font-bold text-slate-900 mt-6">ลักษณะเด่นของ past simple tense:</h4>
        <ul class="list-disc pl-6 space-y-1">
          <li>บอกเหตุการณ์ที่เสร็จสิ้นในอดีต</li>
          <li>มีช่วงเวลาที่ชัดเจนหรือสามารถระบุได้</li>
          <li>ใช้เล่าเรื่องราวตามลำดับเหตุการณ์</li>
          <li>แสดงนิสัยหรือสถานการณ์ในอดีต</li>
        </ul>

        <h4 class="text-lg font-bold text-slate-900 mt-6">ตัวอย่างเบื้องต้น:</h4>
        <ul class="list-disc pl-6 space-y-1">
          <li><strong>I visited Paris last summer.</strong> <em>(ฉันไปเที่ยวปารีสเมื่อฤดูร้อนที่แล้ว)</em></li>
          <li><strong>She studied English for five years.</strong> <em>(เธอเรียนภาษาอังกฤษมาห้าปี)</em></li>
          <li><strong>They lived in Bangkok in 2015.</strong> <em>(พวกเขาอยู่ในกรุงเทพฯ ในปี 2015)</em></li>
        </ul>

        <h3 class="text-xl font-bold text-rose-900 mt-8">โครงสร้าง Simple Past Tense</h3>
        <p>
          Past simple โครงสร้าง แบ่งออกเป็น 3 รูปแบบหลักคือ ประโยคบอกเล่า ปฏิเสธ และคำถาม โดยมีการใช้กริยาช่อง 2 (Past Simple Form) และ did สำหรับประโยคปฏิเสธและคำถาม
        </p>

        <h4 class="text-lg font-bold text-slate-900 mt-6">1. ประโยคบอกเล่า (Affirmative)</h4>
        <div class="overflow-x-auto my-4">
          <table class="w-full border-collapse border border-slate-200 text-sm">
            <thead>
              <tr class="bg-rose-50 text-rose-950 font-bold">
                <th class="border border-slate-200 p-3 text-left">ประธาน</th>
                <th class="border border-slate-200 p-3 text-left">กริยา</th>
                <th class="border border-slate-200 p-3 text-left">ตัวอย่าง</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold">I / You / We / They / He / She / It</td>
                <td class="border border-slate-200 p-3">V2 (กริยาช่องที่ 2)</td>
                <td class="border border-slate-200 p-3">I played football yesterday.</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold">I / He / She / It</td>
                <td class="border border-slate-200 p-3">was</td>
                <td class="border border-slate-200 p-3">She was happy.</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold">You / We / They</td>
                <td class="border border-slate-200 p-3">were</td>
                <td class="border border-slate-200 p-3">They were at school.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="font-bold mt-4">Past simple tense ตัวอย่างประโยคบอกเล่า:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>They went shopping at the mall yesterday. <em>(พวกเขาไปช้อปปิ้งที่ห้างเมื่อวาน)</em></li>
          <li>I studied English last night. <em>(ฉันเรียนภาษาอังกฤษเมื่อคืน)</em></li>
          <li>She cooked dinner for her family. <em>(เธอทำอาหารเย็นให้ครอบครัว)</em></li>
        </ul>

        <h4 class="text-lg font-bold text-slate-900 mt-6">2. ประโยคปฏิเสธ (Negative)</h4>
        <div class="overflow-x-auto my-4">
          <table class="w-full border-collapse border border-slate-200 text-sm">
            <thead>
              <tr class="bg-rose-50 text-rose-950 font-bold">
                <th class="border border-slate-200 p-3 text-left">ประธาน</th>
                <th class="border border-slate-200 p-3 text-left">กริยาช่วย + Not</th>
                <th class="border border-slate-200 p-3 text-left">กริยาหลัก</th>
                <th class="border border-slate-200 p-3 text-left">ตัวอย่าง</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold">I / You / We / They / He / She / It</td>
                <td class="border border-slate-200 p-3 text-rose-800 font-bold">did not (didn't)</td>
                <td class="border border-slate-200 p-3">V.1 (กริยาช่อง 1)</td>
                <td class="border border-slate-200 p-3">I didn't play football.</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold">I / He / She / It</td>
                <td class="border border-slate-200 p-3 text-rose-800 font-bold">was not (wasn't)</td>
                <td class="border border-slate-200 p-3">-</td>
                <td class="border border-slate-200 p-3">She wasn't happy.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="font-bold mt-4">ตัวอย่างประโยคปฏิเสธ:</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>We didn't come to the supermarket last week. <em>(พวกเราไม่ได้ไปซูเปอร์มาร์เก็ตสัปดาห์ที่แล้ว)</em></li>
          <li>He didn't finish his homework yesterday. <em>(เขาไม่ได้ทำการบ้านเสร็จเมื่อวาน)</em></li>
        </ul>

        <h4 class="text-lg font-bold text-slate-900 mt-6">3. ประโยคคำถาม (Question)</h4>
        <div class="overflow-x-auto my-4">
          <table class="w-full border-collapse border border-slate-200 text-sm">
            <thead>
              <tr class="bg-rose-50 text-rose-950 font-bold">
              <th class="border border-slate-200 p-3 text-left">คำถาม</th>
                <th class="border border-slate-200 p-3 text-left">ประธาน</th>
                <th class="border border-slate-200 p-3 text-left">กริยาช่อง 1</th>
                <th class="border border-slate-200 p-3 text-left">ตัวอย่าง</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold">Did</td>
                <td class="border border-slate-200 p-3">ทุกประธาน</td>
                <td class="border border-slate-200 p-3 text-rose-800 font-bold">V1</td>
                <td class="border border-slate-200 p-3">Did you play football?</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold">Was</td>
                <td class="border border-slate-200 p-3">I / He / She / It</td>
                <td class="border border-slate-200 p-3">-</td>
                <td class="border border-slate-200 p-3">Was she ha  ppy?</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold">Were</td>
                <td class="border border-slate-200 p-3">You / We / They</td>
                <td class="border border-slate-200 p-3">-</td>
                <td class="border border-slate-200 p-3">Were they happy?</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 class="text-lg font-bold text-slate-900 mt-6">การตอบกลับ (Short Answers):</h4>
        <ul class="list-disc pl-6 space-y-1">
          <li><strong>Yes, I did.</strong> / <strong>No, I didn't.</strong></li>
          <li><strong>Yes, she was.</strong> / <strong>No, she wasn't.</strong></li>
        </ul>

        <h4 class="text-lg font-bold text-slate-900 mt-6">ตัวอย่างประโยคคำถาม (Yes/No Questions):</h4>
        <ul class="list-disc pl-6 space-y-1">
          <li><strong>Did you bring him the gift?</strong> <em>(คุณนำของขวัญมาให้เขาไหม?)</em></li>
          <li><strong>Were you at home last night?</strong> <em>(คุณอยู่บ้านเมื่อคืนไหม?)</em></li>
        </ul>

        <h4 class="text-lg font-bold text-slate-900 mt-8">3. ประโยคคำถาม Wh-Questions</h4>
        <p class="mb-2">
          <span class="font-semibold text-rose-900">โครงสร้าง:</span> 
          <code class="bg-rose-50 text-rose-800 px-2 py-0.5 rounded font-semibold">Wh-word + did + Subject + Verb 1 + (Object/Complement)?</code>
        </p>

        <div class="overflow-x-auto my-4">
          <table class="w-full border-collapse border border-slate-200 text-sm">
            <thead>
              <tr class="bg-rose-50 text-rose-950 font-bold">
                <th class="border border-slate-200 p-3 text-left w-1/2">ประโยคคำถาม</th>
                <th class="border border-slate-200 p-3 text-left w-1/2">ความหมาย</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold text-slate-900">What did you do yesterday?</td>
                <td class="border border-slate-200 p-3">เมื่อวานคุณทำอะไร</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold text-slate-900">Where did she go last weekend?</td>
                <td class="border border-slate-200 p-3">สุดสัปดาห์ที่แล้วเธอไปไหน</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold text-slate-900">When did they arrive?</td>
                <td class="border border-slate-200 p-3">พวกเขามาถึงเมื่อไหร่</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold text-slate-900">Why did he leave early?</td>
                <td class="border border-slate-200 p-3">ทำไมเขาถึงกลับก่อน</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold text-slate-900">How did you learn English?</td>
                <td class="border border-slate-200 p-3">คุณเรียนภาษาอังกฤษอย่างไร</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold text-slate-900">Who did you see at the mall?</td>
                <td class="border border-slate-200 p-3">คุณเห็นใครที่ห้างสรรพสินค้า</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold text-slate-900">Which book did you buy?</td>
                <td class="border border-slate-200 p-3">คุณซื้อหนังสือเล่มไหน</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold text-slate-900">Whose car did you borrow?</td>
                <td class="border border-slate-200 p-3">คุณยืมรถของใคร</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-xl">
          <h5 class="font-bold text-amber-900 text-sm mb-1">⚠️ ข้อยกเว้นสำหรับคำถามที่ใช้ Who/What เป็นประธาน:</h5>
          <p class="text-xs text-amber-800 leading-relaxed">
            เมื่อ <strong>Who</strong> หรือ <strong>What</strong> ทำหน้าที่เป็นประธานของประโยค <u>ไม่ต้องใช้ did</u> และใช้กริยาในรูป Past Simple (V.2) ได้ทันที
          </p>
        </div>

        <div class="overflow-x-auto my-4">
          <table class="w-full border-collapse border border-slate-200 text-sm">
            <thead>
              <tr class="bg-slate-100 text-slate-800 font-bold">
                <th class="border border-slate-200 p-3 text-left w-1/2">ประโยคคำถาม</th>
                <th class="border border-slate-200 p-3 text-left w-1/2">ความหมาย</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold">Who broke the window?</td>
                <td class="border border-slate-200 p-3">ใครทำหน้าต่างแตก</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold">What happened yesterday?</td>
                <td class="border border-slate-200 p-3">เมื่อวานเกิดอะไรขึ้น</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold">Who called you?</td>
                <td class="border border-slate-200 p-3">ใครโทรหาคุณ</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold">What made that noise?</td>
                <td class="border border-slate-200 p-3">อะไรทำให้เกิดเสียงนั้น</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 font-medium my-4">
          💡 <strong>ข้อสังเกต Irregular Verbs:</strong> การใช้ Simple Past Tense กับคำกริยาไม่เปลี่ยนตามกฎ (Irregular Verbs) จำเป็นต้องศึกษาและท่องจำรูปแบบกริยาช่อง 2
        </p>

        <h3 class="text-xl font-bold text-rose-900 mt-8">III. การใช้ Simple Past Tense</h3>
        <p>Simple Past Tense นิยมใช้ใน 4 กรณีหลัก ดังนี้:</p>

        <div class="space-y-4 mt-4">
          <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
            <h5 class="font-bold text-slate-900 text-sm mb-1">1. แสดงการกระทำที่เกิดขึ้นและจบลงในอดีต</h5>
            <ul class="list-disc pl-5 text-xs space-y-1 text-slate-600">
              <li><strong>World War II began in 1939 and ended in 1945.</strong> <em>(สงครามโลกครั้งที่สองเริ่มขึ้นในปี 1939 และสิ้นสุดในปี 1945)</em></li>
              <li><strong>I graduated from university in 2020.</strong> <em>(ฉันจบมหาวิทยาลัยในปี 2020)</em></li>
            </ul>
          </div>

          <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
            <h5 class="font-bold text-slate-900 text-sm mb-1">2. แสดงการกระทำที่ซ้ำกันในอดีต (นิสัยในอดีต)</h5>
            <ul class="list-disc pl-5 text-xs space-y-1 text-slate-600">
              <li><strong>When I was a little girl, I always read comics.</strong> <em>(ตอนฉันเป็นเด็กผู้หญิง ฉันชอบอ่านการ์ตูนมาก)</em></li>
              <li><strong>He visited his grandmother every weekend when he was young.</strong> <em>(เขาไปเยี่ยมคุณยายทุกสุดสัปดาห์ตอนเด็กๆ)</em></li>
            </ul>
          </div>

          <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
            <h5 class="font-bold text-slate-900 text-sm mb-1">3. แสดงลำดับของการกระทำที่เกิดขึ้นต่อเนื่องกัน</h5>
            <ul class="list-disc pl-5 text-xs space-y-1 text-slate-600">
              <li><strong>Susie closed the door, turned on the light and took off her clothes.</strong> <em>(Susie ปิดประตู เปิดไฟ และถอดเสื้อผ้า)</em></li>
              <li><strong>I woke up, brushed my teeth, and had breakfast.</strong> <em>(ฉันตื่นนอน แปรงฟัน และกินข้าวเช้า)</em></li>
            </ul>
          </div>

          <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
            <h5 class="font-bold text-slate-900 text-sm mb-1">4. แสดงการกระทำที่ขัดจังหวะการกระทำอื่น</h5>
            <ul class="list-disc pl-5 text-xs space-y-1 text-slate-600">
              <li><strong>The children were playing football when their mother came back home.</strong> <em>(เด็กๆ กำลังเล่นฟุตบอลตอนที่แม่กลับมาบ้าน)</em></li>
              <li><strong>I was watching TV when the phone rang.</strong> <em>(ฉันกำลังดูทีวีตอนที่โทรศัพท์ดัง)</em></li>
            </ul>
          </div>
        </div>

        <h3 class="text-xl font-bold text-rose-900 mt-8">IV. สัญญาณการรับรู้ Simple Past Tense (Signal Words)</h3>
        <p>เราสามารถระบุ Simple Past Tense ได้จากคำบอกเวลาหรือคำสัญญาณต่อไปนี้:</p>

        <div class="overflow-x-auto my-4">
          <table class="w-full border-collapse border border-slate-200 text-sm">
            <thead>
              <tr class="bg-rose-50 text-rose-950 font-bold">
                <th class="border border-slate-200 p-3 text-left w-1/3">คำสัญญาณ</th>
                <th class="border border-slate-200 p-3 text-left w-2/3">ตัวอย่างประโยค</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold text-rose-800">Yesterday</td>
                <td class="border border-slate-200 p-3">I went to school yesterday.</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold text-rose-800">Last (week/month/year)</td>
                <td class="border border-slate-200 p-3">She visited her friend last week.</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold text-rose-800">... Ago</td>
                <td class="border border-slate-200 p-3">He finished his work two hours ago.</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold text-rose-800">In + ปี (อดีต)</td>
                <td class="border border-slate-200 p-3">They moved to Bangkok in 2010.</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold text-rose-800">This morning</td>
                <td class="border border-slate-200 p-3">I had breakfast this morning.</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-200 p-3 font-semibold text-rose-800">When ...</td>
                <td class="border border-slate-200 p-3">When I was young, I played football.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-6 p-4 bg-slate-100 rounded-2xl border border-slate-200">
          <h5 class="font-bold text-slate-800 text-sm mb-2">📌 คำอื่นๆ ที่นิยมใช้ร่วมกับ Simple Past Tense:</h5>
          <ul class="list-disc pl-6 text-xs text-slate-700 space-y-1">
            <li><strong>If</strong> (ในประโยคเงื่อนไขประเภทที่ 2 / Second Conditional)</li>
            <li><strong>As though / As if</strong> (ราวกับว่า)</li>
            <li><strong>It's time ...</strong> (ถึงเวลาที่ควรทำ)</li>
            <li><strong>Wish / If only ...</strong> (ปรารถนาในสิ่งที่ตรงข้ามกับความจริง)</li>
            <li><strong>Would rather / Would sooner ...</strong> (อยากจะ...มากกว่า)</li>
          </ul>
        </div>
      </div>`,
      summary: "ใช้กับเหตุการณ์ที่จบลงในอดีตแล้ว",
    },
    {
      title: "6. Past Continuous Tense & Interrupted Actions",
      slug: "past-continuous-tense",
      content: `### Structure & Usage
- **Structure:** Subject + was/were + V.ing
- **Usage:** เหตุการณ์ที่กำลังเกิดขึ้น ณ ช่วงเวลาหนึ่งในอดีต
- **Example:** I was writing tests when the server crashed.`,
      summary: "ใช้กับเหตุการณ์ที่กำลังทำอยู่ในช่วงเวลาอดีต",
    },
    {
      title: "7. Past Perfect Tense & Order of Past Events",
      slug: "past-perfect-tense",
      content: `### Structure & Usage
- **Structure:** Subject + had + V.3
- **Usage:** เหตุการณ์ที่เกิดและจบลงก่อนอีกเหตุการณ์หนึ่งในอดีต
- **Example:** The database had backed up before the power went out.`,
      summary: "ใช้อธิบายเหตุการณ์ที่เกิดก่อนหน้าอีกเหตุการณ์หนึ่งในอดีต",
    },
    {
      title: "8. Past Perfect Continuous Tense",
      slug: "past-perfect-continuous-tense",
      content: `### Structure & Usage
- **Structure:** Subject + had + been + V.ing
- **Usage:** สิ่งที่ทำอย่างต่อเนื่องจนกระทั่งมีอีกเหตุการณ์เกิดขึ้นในอดีต
- **Example:** They had been testing for days before discovering the bug.`,
      summary: "เน้นความต่อเนื่องของเหตุการณ์ก่อนหน้าอดีตอีกจุดหนึ่ง",
    },
    {
      title: "9. Future Simple Tense & Project Predictions",
      slug: "future-simple-tense",
      content: `### Structure & Usage
- **Structure:** Subject + will + V.inf
- **Usage:** เหตุการณ์ที่จะเกิดขึ้นในอนาคต หรือการตัดสินใจทันที
- **Example:** We will release the new feature next week.`,
      summary: "คาดการณ์หรือตัดสินใจทำสิ่งใดในอนาคต",
    },
    {
      title: "10. Future Continuous Tense",
      slug: "future-continuous-tense",
      content: `### Structure & Usage
- **Structure:** Subject + will + be + V.ing
- **Usage:** เหตุการณ์ที่จะกำลังเกิดขึ้น ณ ช่วงเวลาใดเวลาหนึ่งในอนาคต
- **Example:** Tomorrow at 10 AM, I will be presenting the new schema.`,
      summary: "ใช้บอกเหตุการณ์ที่จะกำลังดำเนินอยู่ในเวลาที่ระบุในอนาคต",
    },
    {
      title: "11. Future Perfect Tense & Deadline Commitments",
      slug: "future-perfect-tense",
      content: `### Structure & Usage
- **Structure:** Subject + will + have + V.3
- **Usage:** เหตุการณ์ที่จะเสร็จสิ้นก่อนถึงจุดหนึ่งในอนาคต
- **Example:** By Friday, we will have completed the migration.`,
      summary: "ใช้ตั้งเป้าหมายหรืองานที่จะเสร็จสมบูรณ์ตามกำหนดเวลาอนาคต",
    },
    {
      title: "12. Future Perfect Continuous Tense",
      slug: "future-perfect-continuous-tense",
      content: `### Structure & Usage
- **Structure:** Subject + will + have + been + V.ing
- **Usage:** เหตุการณ์ที่จะทำต่อเนื่องไปจนถึงจุดหนึ่งในอนาคต
- **Example:** By next month, she will have been managing the project for 2 years.`,
      summary: "บอกระยะเวลาที่จะสะสมต่อเนื่องจนถึงจุดเวลาอนาคต",
    },
  ];

  for (let i = 0; i < tensesLessons.length; i++) {
    await prisma.lesson.create({
      data: {
        moduleId: engMod1.id,
        title: tensesLessons[i].title,
        slug: tensesLessons[i].slug,
        content: tensesLessons[i].content,
        summary: tensesLessons[i].summary,
        order: i + 1,
        published: true,
      },
    });
  }

  // Module 2: PREP Framework & Communication Skills
  const engMod2 = await prisma.module.create({
    data: {
      courseId: englishCourse.id,
      title: "Module 2: Vocabulary",
      description: "เรียนรู้คำศัพท์ที่ใช้ในการทำงาน",
      order: 2,
    },
  });

  const vocabLessons = [
    {
      title: "Adjective and Adverb",
      slug: "adjective",
      content: `<div class="space-y-6 font-sans text-slate-800 leading-relaxed">
        <!-- 1. Adjective -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">1. Adjective คืออะไร และทำหน้าที่อะไร?</h3>
          <p class="text-slate-700 mb-3">
            <strong>Adjective (คำคุณศัพท์)</strong> ทำหน้าที่ขยายคำนามหรือสรรพนาม เพื่อบอกลักษณะ คุณสมบัติ หรือปริมาณ ตอบคำถามว่า <em>"แบบไหน"</em> หรือ <em>"ลักษณะอย่างไร"</em> (what kind?) โดย Adjective จะเกาะอยู่กับคำนามเสมอ
          </p>
          
          <div class="p-4 bg-rose-50/60 border border-rose-100 rounded-2xl text-xs space-y-1">
            <p>• <strong>a beautiful garden</strong> = สวนที่สวย <em>(beautiful ขยาย garden)</em></p>
            <p>• <strong>a tall building</strong> = ตึกที่สูง <em>(tall ขยาย building)</em></p>
            <p>• <strong>She is happy.</strong> = เธอมีความสุข <em>(happy ขยายสรรพนาม She ผ่าน is)</em></p>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- 2. Adverb -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">2. Adverb คืออะไร และทำหน้าที่อะไร?</h3>
          <p class="text-slate-700 mb-3">
            <strong>Adverb (คำกริยาวิเศษณ์)</strong> ทำหน้าที่ขยายกริยา, adjective หรือ adverb อื่น เพื่อบอกว่า อย่างไร, บ่อยแค่ไหน หรือมากน้อยเพียงใด ตอบคำถามว่า <em>"อย่างไร"</em> (how?) หรือ <em>"บ่อยแค่ไหน"</em> (how often?)
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-3">
            <div class="p-3 bg-white border border-slate-200 rounded-xl">
              <h6 class="font-bold text-rose-900 mb-1">1. ขยายกริยา</h6>
              <p>She runs <strong>quickly</strong>.</p>
              <p class="text-slate-500">(quickly ขยาย runs)</p>
            </div>
            <div class="p-3 bg-white border border-slate-200 rounded-xl">
              <h6 class="font-bold text-rose-900 mb-1">2. ขยาย Adjective</h6>
              <p>He is <strong>very</strong> tall.</p>
              <p class="text-slate-500">(very ขยาย tall)</p>
            </div>
            <div class="p-3 bg-white border border-slate-200 rounded-xl">
              <h6 class="font-bold text-rose-900 mb-1">3. ขยาย Adverb อื่น</h6>
              <p>She sings <strong>really</strong> slowly.</p>
              <p class="text-slate-500">(really ขยาย slowly)</p>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- 3. Comparison Table -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">3. ตารางเปรียบเทียบ Adjective กับ Adverb</h3>
          <div class="overflow-x-auto mb-4">
            <table class="w-full border-collapse border border-slate-200 text-sm">
              <thead>
                <tr class="bg-rose-50 text-rose-950 font-bold">
                  <th class="border border-slate-200 p-3 text-left w-1/4">เกณฑ์</th>
                  <th class="border border-slate-200 p-3 text-left w-3/8">Adjective</th>
                  <th class="border border-slate-200 p-3 text-left w-3/8">Adverb</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-xs">
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold">ทำหน้าที่</td>
                  <td class="border border-slate-200 p-3">ขยายคำนามหรือสรรพนาม</td>
                  <td class="border border-slate-200 p-3">ขยายกริยา, adjective หรือ adverb อื่น</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold">ตอบคำถาม</td>
                  <td class="border border-slate-200 p-3">แบบไหน ลักษณะใด (what kind?)</td>
                  <td class="border border-slate-200 p-3">อย่างไร บ่อยแค่ไหน (how? how often?)</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold">ตำแหน่งเด่น</td>
                  <td class="border border-slate-200 p-3">หน้าคำนาม หรือหลัง linking verb</td>
                  <td class="border border-slate-200 p-3">หลังกริยา หรือต้น กลาง ท้ายประโยค</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-semibold">ตัวอย่าง</td>
                  <td class="border border-slate-200 p-3 font-bold text-rose-800">a quick car (รถเร็ว)</td>
                  <td class="border border-slate-200 p-3 font-bold text-rose-800">drives quickly (ขับอย่างเร็ว)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- Rules for -ly -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">4. กฎการสะกดเมื่อเติม -ly ครบทุกกรณี</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-1">1. ลงท้ายด้วย -y → เปลี่ยนเป็น -ily</h5>
              <p class="text-slate-600 mb-2">เปลี่ยน y เป็น i แล้วเติม -ly</p>
              <p class="font-mono text-rose-900 font-bold">• happy → happily, easy → easily, angry → angrily</p>
              <p class="text-amber-800 bg-amber-50 p-1.5 rounded mt-2">⚠️ ข้อยกเว้นคำสั้น: shy → shyly</p>
            </div>

            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-1">2. พยัญชนะ + -le → เปลี่ยนเป็น -ly</h5>
              <p class="text-slate-600 mb-2">ตัด e ทิ้งแล้วเติม -y</p>
              <p class="font-mono text-rose-900 font-bold">• simple → simply, gentle → gently, terrible → terribly</p>
            </div>

            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-1">3. ลงท้ายด้วย -ic → เปลี่ยนเป็น -ically</h5>
              <p class="text-slate-600 mb-2">เติม -ally ต่อท้าย</p>
              <p class="font-mono text-rose-900 font-bold">• basic → basically, automatic → automatically</p>
              <p class="text-red-700 bg-red-50 p-1.5 rounded mt-2">⚠️ ข้อยกเว้นสำคัญ: public → publicly (ไม่ใช่ publically)</p>
            </div>

            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h5 class="font-bold text-slate-900 text-sm mb-1">4. คำยกเว้นเฉพาะที่ต้องท่องจำ</h5>
              <ul class="font-mono text-rose-900 font-bold space-y-0.5">
                <li>• true → truly</li>
                <li>• full → fully</li>
                <li>• whole → wholly</li>
                <li>• due → duly</li>
              </ul>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- Good vs Well -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">5. Good กับ Well ต่างกันอย่างไร?</h3>
          <p class="text-xs text-slate-700 mb-3">
            <strong>Good</strong> เป็น Adjective (เกาะคำนาม) ส่วน <strong>Well</strong> เป็น Adverb (เกาะกริยา)
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
            <div class="p-3 bg-red-50 border border-red-200 rounded-xl">
              <p class="font-bold text-red-700">❌ ตัวอย่างที่ผิด:</p>
              <p class="font-mono">He plays good. / She sings good.</p>
            </div>
            <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <p class="font-bold text-emerald-700">✅ ตัวอย่างที่ถูกต้อง:</p>
              <p class="font-mono">He plays well. / She sings well.</p>
            </div>
          </div>

          <div class="p-3 bg-slate-100 rounded-xl text-xs text-slate-700">
            💡 <strong>I'm good vs I'm well:</strong><br/>
            • <em>"I'm good"</em> = สบายดี/โอเค<br/>
            • <em>"I'm well"</em> = สุขภาพแข็งแรงดี (well ในกรณีนี้ทำหน้าที่เป็น Adjective เรื่องสุขภาพ)
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- False -ly Words -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">6. คำที่ลงท้ายด้วย -ly แต่เป็น Adjective (ไม่ใช่ Adverb)</h3>
          <p class="text-xs text-slate-700 mb-3">
            คำกลุ่มนี้แม้ลงท้ายด้วย -ly แต่ทำหน้าที่เป็น Adjective ขยายคำนามเสมอ:
          </p>

          <div class="flex flex-wrap gap-2 text-xs font-mono font-bold text-rose-900 mb-3">
            <span class="bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg">friendly</span>
            <span class="bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg">lovely</span>
            <span class="bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg">ugly</span>
            <span class="bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg">lonely</span>
            <span class="bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg">silly</span>
          </div>

          <p class="text-xs text-slate-600 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
            📌 หากต้องการใช้ในเชิง Adverb ให้ใช้วลี: <strong>"in a + adj + way"</strong> เช่น <br/>
            <em>She smiled in a friendly way.</em> (เธอยิ้มอย่างเป็นมิตร)
          </p>
        </div>

        <hr class="border-rose-100" />

        <!-- Same Form Words -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">7. คำที่เป็นได้ทั้ง Adjective และ Adverb ในรูปเดียวกัน</h3>
          <div class="overflow-x-auto mb-4">
            <table class="w-full border-collapse border border-slate-200 text-sm">
              <thead>
                <tr class="bg-rose-50 text-rose-950 font-bold">
                  <th class="border border-slate-200 p-2.5 text-left">คำ</th>
                  <th class="border border-slate-200 p-2.5 text-left">เมื่อเป็น Adjective</th>
                  <th class="border border-slate-200 p-2.5 text-left">เมื่อเป็น Adverb</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-xs font-mono">
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">fast</td><td class="border border-slate-200 p-2.5">a fast car</td><td class="border border-slate-200 p-2.5">drives fast (ไม่มี fastly)</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">hard</td><td class="border border-slate-200 p-2.5">hard work</td><td class="border border-slate-200 p-2.5">works hard</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">late</td><td class="border border-slate-200 p-2.5">a late train</td><td class="border border-slate-200 p-2.5">arrived late</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">high</td><td class="border border-slate-200 p-2.5">a high wall</td><td class="border border-slate-200 p-2.5">jumps high</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">early</td><td class="border border-slate-200 p-2.5">an early bus</td><td class="border border-slate-200 p-2.5">woke up early</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- Meaning Shift Words -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">8. คู่คำที่ความหมายเปลี่ยนไปเมื่อเติม -ly (ระวัง!)</h3>
          <div class="overflow-x-auto mb-4">
            <table class="w-full border-collapse border border-slate-200 text-sm">
              <thead>
                <tr class="bg-rose-50 text-rose-950 font-bold">
                  <th class="border border-slate-200 p-2.5 text-left">คำเดิม</th>
                  <th class="border border-slate-200 p-2.5 text-left">ความหมาย</th>
                  <th class="border border-slate-200 p-2.5 text-left">เติม -ly</th>
                  <th class="border border-slate-200 p-2.5 text-left">ความหมายใหม่</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-xs">
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-2.5 font-bold">hard</td>
                  <td class="border border-slate-200 p-2.5">หนัก, ยาก (works hard)</td>
                  <td class="border border-slate-200 p-2.5 font-bold text-red-600">hardly</td>
                  <td class="border border-slate-200 p-2.5 font-semibold text-red-600">แทบจะไม่ (can hardly hear)</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-2.5 font-bold">late</td>
                  <td class="border border-slate-200 p-2.5">สาย (arrived late)</td>
                  <td class="border border-slate-200 p-2.5 font-bold text-rose-800">lately</td>
                  <td class="border border-slate-200 p-2.5">เมื่อเร็วๆ นี้ (busy lately)</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-2.5 font-bold">near</td>
                  <td class="border border-slate-200 p-2.5">ใกล้ (stood near)</td>
                  <td class="border border-slate-200 p-2.5 font-bold text-rose-800">nearly</td>
                  <td class="border border-slate-200 p-2.5">เกือบ (nearly finished)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- Position Rules -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">9. ตำแหน่งการวาง Adjective และ Adverb ในประโยค</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm space-y-2">
              <h5 class="font-bold text-slate-900 text-sm">ตำแหน่งของ Adjective</h5>
              <p>• <strong>หน้าคำนาม:</strong> a <u>beautiful</u> girl, a <u>tall</u> man</p>
              <p>• <strong>หลัง Linking Verb:</strong> She is <u>beautiful</u>, It smells <u>good</u>.</p>
              <p class="text-slate-500 font-mono">(Linking Verbs: be, look, feel, taste, smell, seem)</p>
            </div>

            <div class="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm space-y-2">
              <h5 class="font-bold text-slate-900 text-sm">ตำแหน่งของ Adverb</h5>
              <p>• <strong>ต้นประโยค:</strong> <u>Suddenly</u>, it rained.</p>
              <p>• <strong>กลางประโยค:</strong> She <u>often</u> sings. / She is <u>always</u> late.</p>
              <p>• <strong>ท้ายประโยค:</strong> He drives <u>carefully</u>.</p>
            </div>
          </div>
        </div>
      </div>
`,
      summary: "เทคนิคการเลือกใช้ Adjective และ Adverb ให้ถูกตำแหน่งในประโยค",
    },
    {
      title: "Gerund and To Infinitive",
      slug: "gerund",
      content: `<div class="space-y-6 font-sans text-slate-800 leading-relaxed">
        <!-- I. Introduction -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">I. Gerund และ Infinitive คืออะไร?</h3>
          <p class="text-slate-700 mb-4">
            <strong>Gerund</strong> และ <strong>Infinitive</strong> คือรูปแบบของกริยาที่ถูกนำมาทำหน้าที่คล้ายกับคำนามในประโยค
          </p>

          <div class="overflow-x-auto mb-4">
            <table class="w-full border-collapse border border-slate-200 text-sm">
              <thead>
                <tr class="bg-rose-50 text-rose-950 font-bold">
                  <th class="border border-slate-200 p-3 text-left w-1/4">รูปแบบ</th>
                  <th class="border border-slate-200 p-3 text-left w-1/4">โครงสร้าง</th>
                  <th class="border border-slate-200 p-3 text-left w-1/4">ตัวอย่าง</th>
                  <th class="border border-slate-200 p-3 text-left w-1/4">ความหมาย</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-xs">
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-bold text-rose-900">Gerund</td>
                  <td class="border border-slate-200 p-3 font-mono">Verb + ing</td>
                  <td class="border border-slate-200 p-3 font-semibold">Swimming is fun.</td>
                  <td class="border border-slate-200 p-3">การว่ายน้ำสนุก</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-3 font-bold text-rose-900">To Infinitive</td>
                  <td class="border border-slate-200 p-3 font-mono">to + Verb (base form)</td>
                  <td class="border border-slate-200 p-3 font-semibold">I want to swim.</td>
                  <td class="border border-slate-200 p-3">ฉันอยากว่ายน้ำ</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div class="p-4 bg-rose-50/60 border border-rose-100 rounded-2xl">
              <h5 class="font-bold text-rose-950 text-sm mb-2">📌 Gerund (V-ing):</h5>
              <ul class="list-disc pl-4 space-y-1 text-slate-700">
                <li>ทำหน้าที่เป็นคำนาม</li>
                <li>เป็นได้ทั้ง ประธาน, กรรม หรือส่วนเติมเต็ม</li>
                <li>มักใช้พูดถึงกิจกรรมทั่วไป</li>
                <li>แสดงการกระทำที่เสร็จสิ้นแล้ว หรือเป็นจริง</li>
              </ul>
            </div>

            <div class="p-4 bg-slate-100 border border-slate-200 rounded-2xl">
              <h5 class="font-bold text-slate-900 text-sm mb-2">📌 To Infinitive (to + V1):</h5>
              <ul class="list-disc pl-4 space-y-1 text-slate-700">
                <li>ทำหน้าที่เป็น คำนาม, คำคุณศัพท์ หรือคำวิเศษณ์</li>
                <li>มักใช้แสดงจุดประสงค์หรือเป้าหมาย</li>
                <li>แสดงการกระทำในอนาคต หรือที่ยังไม่เกิด</li>
                <li>มักตามหลังกริยาแสดงความต้องการหรือการตัดสินใจ</li>
              </ul>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- II. Verbs Followed by Gerund -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">II. กริยาที่ตามด้วย Gerund (V-ing) เสมอ</h3>
          <p class="text-xs text-slate-600 mb-4">กลุ่มคำกริยาที่ต้องตามด้วย V-ing เท่านั้น ห้ามใช้ To Infinitive</p>

          <div class="overflow-x-auto mb-4">
            <table class="w-full border-collapse border border-slate-200 text-sm">
              <thead>
                <tr class="bg-rose-50 text-rose-950 font-bold">
                  <th class="border border-slate-200 p-2.5 text-left w-1/4">กริยา</th>
                  <th class="border border-slate-200 p-2.5 text-left w-1/2">ตัวอย่างประโยค</th>
                  <th class="border border-slate-200 p-2.5 text-left w-1/4">ความหมาย</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-xs">
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">enjoy</td><td class="border border-slate-200 p-2.5">I enjoy <strong>reading</strong> books.</td><td class="border border-slate-200 p-2.5">ฉันชอบอ่านหนังสือ</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">finish</td><td class="border border-slate-200 p-2.5">She finished <strong>writing</strong> the report.</td><td class="border border-slate-200 p-2.5">เธอเขียนรายงานเสร็จแล้ว</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">avoid</td><td class="border border-slate-200 p-2.5">He avoids <strong>eating</strong> junk food.</td><td class="border border-slate-200 p-2.5">เขาหลีกเลี่ยงการกินอาหารขยะ</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">mind</td><td class="border border-slate-200 p-2.5">Do you mind <strong>opening</strong> the window?</td><td class="border border-slate-200 p-2.5">คุณรังเกียจเปิดหน้าต่างไหม?</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">suggest</td><td class="border border-slate-200 p-2.5">I suggest <strong>going</strong> to the beach.</td><td class="border border-slate-200 p-2.5">ฉันแนะนำให้ไปชายหาด</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">consider</td><td class="border border-slate-200 p-2.5">They're considering <strong>buying</strong> a house.</td><td class="border border-slate-200 p-2.5">พวกเขากำลังพิจารณาซื้อบ้าน</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">practice</td><td class="border border-slate-200 p-2.5">She practices <strong>playing</strong> the piano daily.</td><td class="border border-slate-200 p-2.5">เธอฝึกเปียโนทุกวัน</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">deny</td><td class="border border-slate-200 p-2.5">He denied <strong>stealing</strong> the money.</td><td class="border border-slate-200 p-2.5">เขาปฏิเสธว่าขโมยเงิน</td></tr>
              </tbody>
            </table>
          </div>

          <div class="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs">
            <h5 class="font-bold text-slate-800 mb-2">📋 รายการกริยาที่ใช้กับ Gerund เท่านั้น:</h5>
            <p class="font-mono text-rose-900 leading-relaxed font-semibold">
              admit, appreciate, avoid, consider, delay, deny, enjoy, finish, imagine, keep, mind, miss, practice, quit, risk, suggest, understand
            </p>
            <div class="mt-2 text-slate-600 space-y-1">
              <p>• <strong>I appreciate your helping me.</strong> <em>(ฉันขอบคุณที่คุณช่วยฉัน)</em></p>
              <p>• <strong>She can't imagine living without her phone.</strong> <em>(เธอนึกไม่ออกว่าจะอยู่โดยไม่มีโทรศัพท์)</em></p>
              <p>• <strong>They kept talking during the movie.</strong> <em>(พวกเขาพูดคุยกันตลอดช่วงหนังเล่น)</em></p>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- III. Verbs Followed by To Infinitive -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">III. กริยาที่ตามด้วย To Infinitive (to + V1) เสมอ</h3>
          <p class="text-xs text-slate-600 mb-4">กลุ่มคำกริยาที่ต้องตามด้วย to + V.1 (Base form) เท่านั้น</p>

          <div class="overflow-x-auto mb-4">
            <table class="w-full border-collapse border border-slate-200 text-sm">
              <thead>
                <tr class="bg-rose-50 text-rose-950 font-bold">
                  <th class="border border-slate-200 p-2.5 text-left w-1/4">กริยา</th>
                  <th class="border border-slate-200 p-2.5 text-left w-1/2">ตัวอย่างประโยค</th>
                  <th class="border border-slate-200 p-2.5 text-left w-1/4">ความหมาย</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-xs">
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">want</td><td class="border border-slate-200 p-2.5">I want <strong>to learn</strong> English.</td><td class="border border-slate-200 p-2.5">ฉันอยากเรียนอังกฤษ</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">need</td><td class="border border-slate-200 p-2.5">She needs <strong>to rest</strong>.</td><td class="border border-slate-200 p-2.5">เธอต้องการพักผ่อน</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">decide</td><td class="border border-slate-200 p-2.5">We decided <strong>to go</strong> home.</td><td class="border border-slate-200 p-2.5">เราตัดสินใจกลับบ้าน</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">plan</td><td class="border border-slate-200 p-2.5">They plan <strong>to travel</strong> next month.</td><td class="border border-slate-200 p-2.5">พวกเขาวางแผนจะเดินทางเดือนหน้า</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">hope</td><td class="border border-slate-200 p-2.5">I hope <strong>to see</strong> you soon.</td><td class="border border-slate-200 p-2.5">ฉันหวังว่าจะเจอคุณเร็วๆ นี้</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">promise</td><td class="border border-slate-200 p-2.5">He promised <strong>to call</strong> me.</td><td class="border border-slate-200 p-2.5">เขาสัญญาว่าจะโทรหาฉัน</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">offer</td><td class="border border-slate-200 p-2.5">She offered <strong>to help</strong>.</td><td class="border border-slate-200 p-2.5">เธอเสนอตัวจะช่วย</td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold text-rose-800">refuse</td><td class="border border-slate-200 p-2.5">They refused <strong>to answer</strong>.</td><td class="border border-slate-200 p-2.5">พวกเขาปฏิเสธที่จะตอบ</td></tr>
              </tbody>
            </table>
          </div>

          <div class="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs">
            <h5 class="font-bold text-slate-800 mb-2">📋 รายการกริยาที่ใช้กับ To Infinitive เท่านั้น:</h5>
            <p class="font-mono text-rose-900 leading-relaxed font-semibold">
              agree, appear, arrange, choose, decide, deserve, expect, hope, learn, need, offer, plan, promise, refuse, seem, want, wish, would like
            </p>
            <div class="mt-2 text-slate-600 space-y-1">
              <p>• <strong>He agreed to meet us at 5 PM.</strong> <em>(เขาตกลงที่จะพบเราตอน 5 โมงเย็น)</em></p>
              <p>• <strong>She appears to be happy.</strong> <em>(เธอดูเหมือนจะมีความสุข)</em></p>
              <p>• <strong>We expect to finish soon.</strong> <em>(เราคาดว่าจะเสร็จเร็วๆ นี้)</em></p>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- IV. Verbs Followed by Both -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-4">IV. กริยาที่ใช้ได้ทั้ง Gerund และ To Infinitive</h3>

          <!-- 1. Meaning Same -->
          <div class="mb-6">
            <h4 class="text-lg font-bold text-slate-900 mb-2">1. ใช้แทนกันได้ ความหมายไม่เปลี่ยน</h4>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse border border-slate-200 text-sm">
                <thead>
                  <tr class="bg-rose-50 text-rose-950 font-bold">
                    <th class="border border-slate-200 p-2.5 text-left w-1/4">กริยา</th>
                    <th class="border border-slate-200 p-2.5 text-left w-1/3">แบบ Gerund (V-ing)</th>
                    <th class="border border-slate-200 p-2.5 text-left w-1/3">แบบ To Infinitive</th>
                    <th class="border border-slate-200 p-2.5 text-left w-1/4">ความหมาย</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 text-xs">
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold">begin</td><td class="border border-slate-200 p-2.5">It began raining.</td><td class="border border-slate-200 p-2.5">It began to rain.</td><td class="border border-slate-200 p-2.5">เริ่มฝนตก</td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold">start</td><td class="border border-slate-200 p-2.5">She started working.</td><td class="border border-slate-200 p-2.5">She started to work.</td><td class="border border-slate-200 p-2.5">เธอเริ่มทำงาน</td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold">continue</td><td class="border border-slate-200 p-2.5">They continued talking.</td><td class="border border-slate-200 p-2.5">They continued to talk.</td><td class="border border-slate-200 p-2.5">พวกเขาพูดคุยต่อ</td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold">like</td><td class="border border-slate-200 p-2.5">I like swimming.</td><td class="border border-slate-200 p-2.5">I like to swim.</td><td class="border border-slate-200 p-2.5">ฉันชอบว่ายน้ำ</td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold">love</td><td class="border border-slate-200 p-2.5">He loves reading.</td><td class="border border-slate-200 p-2.5">He loves to read.</td><td class="border border-slate-200 p-2.5">เขาชอบอ่านหนังสือ</td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold">hate</td><td class="border border-slate-200 p-2.5">She hates waiting.</td><td class="border border-slate-200 p-2.5">She hates to wait.</td><td class="border border-slate-200 p-2.5">เธอเกลียดการรอ</td></tr>
                  <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-bold">prefer</td><td class="border border-slate-200 p-2.5">We prefer staying home.</td><td class="border border-slate-200 p-2.5">We prefer to stay home.</td><td class="border border-slate-200 p-2.5">ชอบอยู่บ้านมากกว่า</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 2. Meaning Changes -->
          <div>
            <h4 class="text-lg font-bold text-slate-900 mb-2">2. กริยาที่ความหมายเปลี่ยนแปลงตามรูปแบบ (ระวัง!)</h4>
            <div class="overflow-x-auto mb-4">
              <table class="w-full border-collapse border border-slate-200 text-sm">
                <thead>
                  <tr class="bg-rose-50 text-rose-950 font-bold">
                    <th class="border border-slate-200 p-2.5 text-left w-1/6">กริยา</th>
                    <th class="border border-slate-200 p-2.5 text-left w-5/12">+ Gerund (V-ing)</th>
                    <th class="border border-slate-200 p-2.5 text-left w-5/12">+ To Infinitive (to + V1)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 text-xs">
                  <tr class="hover:bg-slate-50">
                    <td class="border border-slate-200 p-2.5 font-bold text-rose-900">remember</td>
                    <td class="border border-slate-200 p-2.5"><strong>Remember doing</strong> = จำได้ว่าทำไปแล้ว <br/><span class="text-slate-500">I remember meeting you. (จำได้ว่าเคยเจอคุณ)</span></td>
                    <td class="border border-slate-200 p-2.5"><strong>Remember to do</strong> = จำไว้ว่าต้องทำ (ยังไม่ได้ทำ) <br/><span class="text-slate-500">Remember to call me. (อย่าลืมโทรหาฉันนะ)</span></td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="border border-slate-200 p-2.5 font-bold text-rose-900">forget</td>
                    <td class="border border-slate-200 p-2.5"><strong>Forget doing</strong> = ลืมว่าเคยทำไปแล้ว <br/><span class="text-slate-500">I'll never forget visiting Paris. (ไม่ลืมว่าเคยไป)</span></td>
                    <td class="border border-slate-200 p-2.5"><strong>Forget to do</strong> = ลืมที่จะทำ (เลยไม่ได้ทำ) <br/><span class="text-slate-500">I forgot to buy milk. (ฉันลืมซื้อนม)</span></td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="border border-slate-200 p-2.5 font-bold text-rose-900">stop</td>
                    <td class="border border-slate-200 p-2.5"><strong>Stop doing</strong> = เลิก/หยุดทำสิ่งนั้นไปเลย <br/><span class="text-slate-500">He stopped smoking. (เขาเลิกสูบบุหรี่แล้ว)</span></td>
                    <td class="border border-slate-200 p-2.5"><strong>Stop to do</strong> = หยุดพักเพื่อที่จะทำสิ่งนั้น <br/><span class="text-slate-500">He stopped to smoke. (เขาหยุดเพื่อสูบบุหรี่)</span></td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="border border-slate-200 p-2.5 font-bold text-rose-900">try</td>
                    <td class="border border-slate-200 p-2.5"><strong>Try doing</strong> = ลองทำดู (ทดลอง) <br/><span class="text-slate-500">Try eating less sugar. (ลองทานน้ำตาลน้อยลงดู)</span></td>
                    <td class="border border-slate-200 p-2.5"><strong>Try to do</strong> = พยายามทำ (ตั้งใจทำให้ได้) <br/><span class="text-slate-500">Try to finish on time. (พยายามทำให้เสร็จตรงเวลา)</span></td>
                  </tr>
                  <tr class="hover:bg-slate-50">
                    <td class="border border-slate-200 p-2.5 font-bold text-rose-900">regret</td>
                    <td class="border border-slate-200 p-2.5"><strong>Regret doing</strong> = เสียใจที่ได้ทำลงไปแล้ว <br/><span class="text-slate-500">I regret buying this car. (ฉันเสียใจที่ซื้อรถคันนี้)</span></td>
                    <td class="border border-slate-200 p-2.5"><strong>Regret to do</strong> = เสียใจที่จะต้องบอก/ทำ <br/><span class="text-slate-500">I regret to inform you. (เสียใจที่จะต้องแจ้งให้ทราบ)</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- V. Preposition + Gerund -->
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">V. Preposition + Gerund</h3>
          <p class="text-xs text-slate-700 mb-4">
            หลังคำบุพบท หรือ Preposition (เช่น <em>in, on, at, for, to, about, of, with</em>) <u>ต้องตามด้วย Gerund (V-ing) เสมอ</u> ห้ามใช้ To Infinitive
          </p>

          <div class="overflow-x-auto mb-4">
            <table class="w-full border-collapse border border-slate-200 text-sm">
              <thead>
                <tr class="bg-rose-50 text-rose-950 font-bold">
                  <th class="border border-slate-200 p-2.5 text-left w-1/3">วลีพบบ่อย</th>
                  <th class="border border-slate-200 p-2.5 text-left w-2/3">ตัวอย่างประโยค</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-xs">
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-semibold">interested in + gerund</td><td class="border border-slate-200 p-2.5">I'm interested in <strong>learning</strong> guitar. <em>(สนใจการเรียนกีตาร์)</em></td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-semibold">good at + gerund</td><td class="border border-slate-200 p-2.5">She's good at <strong>solving</strong> problems. <em>(เธอเก่งการแก้ปัญหา)</em></td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-semibold">tired of + gerund</td><td class="border border-slate-200 p-2.5">I'm tired of <strong>waiting</strong>. <em>(ฉันเหนื่อย/เบื่อที่จะต้องรอ)</em></td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-semibold">look forward to + gerund</td><td class="border border-slate-200 p-2.5">I look forward to <strong>seeing</strong> you. <em>(ตั้งตารอที่จะได้พบคุณ)</em></td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-semibold">think about + gerund</td><td class="border border-slate-200 p-2.5">I'm thinking about <strong>changing</strong> jobs. <em>(คิดเกี่ยวกับการเปลี่ยนงาน)</em></td></tr>
                <tr class="hover:bg-slate-50"><td class="border border-slate-200 p-2.5 font-semibold">thank you for + gerund</td><td class="border border-slate-200 p-2.5">Thank you for <strong>helping</strong> me. <em>(ขอบคุณสำหรับการช่วยฉัน)</em></td></tr>
              </tbody>
            </table>
          </div>

          <!-- Look forward to Caution Box -->
          <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl text-xs space-y-1 text-amber-950">
            <h5 class="font-bold text-amber-900 text-sm">⚠️ ข้อควรระวังกับ "look forward to":</h5>
            <p>
              คำว่า "to" ใน <strong>look forward to</strong> ทำหน้าที่เป็น Preposition ไม่ใช่ To Infinitive ดังนั้นกริยาที่ตามหลังมาจึงต้องเป็น <u>Gerund (V-ing) เท่านั้น</u>
            </p>
            <p class="pt-1">• ✅ <strong>I look forward to meeting you.</strong></p>
            <p>• ❌ <span class="line-through">I look forward to meet you.</span></p>
          </div>
        </div>
      </div>`,
      summary:
        "เรียนรู้การใช้ Gerund และ To Infinitive และรูปแบบต่างๆในภาษาอังกฤษ",
    },
  ];

  // Create lessons using loop
  for (let i = 0; i < vocabLessons.length; i++) {
    await prisma.lesson.create({
      data: {
        moduleId: engMod2.id,
        title: vocabLessons[i].title,
        slug: vocabLessons[i].slug,
        content: vocabLessons[i].content,
        summary: vocabLessons[i].summary,
        order: i + 1,
        published: true,
      },
    });
  }

  // ---------------------------------------------------------------------------
  // NODE.JS BACKEND COURSE SEEDING
  // ---------------------------------------------------------------------------

  const nodeCourse = await prisma.course.create({
    data: {
      title: "Node.js Backend Development Masterclass",
      slug: "nodejs-backend-development",
      description:
        "คู่มือสอน Node.js ครอบคลุมการเชื่อมต่อฐานข้อมูล ระบบ Authentication พร้อม Role-based Access และการสร้าง REST API แบบ CRUD (เนื้อหา Nest.js อยู่ในแท็บถัดไป)",
      category: "Backend",
      level: "INTERMEDIATE",
      published: true,
    },
  });

  // Create Module
  const nodeModule = await prisma.module.create({
    data: {
      courseId: nodeCourse.id,
      title: "Node.js Core Backend Masterclass",
      description:
        "เรียนรู้ครบทั้ง 3 บทเรียนหลัก: Database, Authentication & Role, และ REST API",
      order: 1,
    },
  });

  // ===========================================================================
  // LESSON 1: Database Connection
  // ===========================================================================
  await prisma.lesson.create({
    data: {
      moduleId: nodeModule.id,
      title: "บทที่ 1: การเชื่อมต่อกับฐานข้อมูล (PostgreSQL, Neon, SQL Server)",
      slug: "node-database-connection",
      order: 1,
      published: true,
      summary:
        "เรียนรู้การเชื่อมต่อฐานข้อมูล 3 รูปแบบ (PostgreSQL, Neon Postgres และ SQL Server) โดยใช้ Prisma ORM ใน Node.js Express",
      content: `
      <div class="space-y-6 font-sans text-slate-800 leading-relaxed">
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">บทที่ 1: การเชื่อมต่อกับฐานข้อมูล</h3>
          <p class="text-sm text-slate-700">
            ใช้ Prisma ORM เป็นตัวกลางเชื่อมต่อฐานข้อมูล เพราะ schema เดียวปรับ provider ได้ทั้ง PostgreSQL, Neon Postgres และ SQL Server โดยไม่ต้องเปลี่ยนโค้ดฝั่ง query
          </p>
          
          <div class="mt-3 p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs leading-relaxed">
            <p className="text-emerald-400"># ติดตั้ง Dependencies เริ่มต้น</p>
            <p>npm init -y</p>
            <p>npm install express prisma @prisma/client dotenv</p>
            <p>npx prisma init</p>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- 1.1 PostgreSQL -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">1.1 เชื่อมต่อ PostgreSQL (ปกติ / on-prem หรือ Docker)</h4>
          <p class="text-xs text-slate-600 mb-2">กำหนดไฟล์ <code class="bg-rose-50 text-rose-800 px-1.5 py-0.5 rounded font-bold">.env</code> และ <code class="bg-rose-50 text-rose-800 px-1.5 py-0.5 rounded font-bold">prisma/schema.prisma</code> ดังนี้:</p>

          <div class="space-y-3">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">.env</span>
              <pre class="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"</code></pre>
            </div>

            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">prisma/schema.prisma</span>
              <pre class="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  role      String   @default("user")
  createdAt DateTime @default(now())
}</code></pre>
            </div>
            
            <pre class="p-3 bg-slate-900 text-emerald-400 rounded-xl text-xs font-mono"><code>npx prisma migrate dev --name init</code></pre>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- 1.2 Neon Postgres -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">1.2 เชื่อมต่อ Neon Postgres (Serverless Postgres)</h4>
          <p class="text-xs text-slate-700 leading-relaxed mb-3">
            Neon คือ Postgres แบบ serverless บน cloud — ใช้ driver ตัวเดียวกับ Postgres ปกติ ต่างกันแค่ connection string ต้องเปิด <code class="bg-rose-50 text-rose-800 px-1.5 py-0.5 rounded font-bold">sslmode=require</code> เสมอ (Neon บังคับ TLS)
          </p>

          <div class="p-4 bg-rose-50/60 border border-rose-100 rounded-2xl text-xs space-y-2 text-slate-700">
            <p>1. สร้างโปรเจกต์ที่ <a href="https://neon.tech" target="_blank" class="text-rose-800 underline font-bold">https://neon.tech</a> แล้วคัดลอก connection string</p>
            <p>2. ใส่ใน <code class="bg-white px-1.5 py-0.5 rounded border border-rose-200 font-mono">.env</code>:</p>
            <pre class="p-2.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] overflow-x-auto"><code>DATABASE_URL="postgresql://&lt;user&gt;:&lt;password&gt;@&lt;endpoint&gt;.neon.tech/&lt;dbname&gt;?sslmode=require"</code></pre>
            <p class="pt-1">
              <code class="font-bold">schema.prisma</code> ใช้ <code class="font-mono text-rose-900">provider = "postgresql"</code> เหมือนเดิมทุกอย่าง — Neon เข้ากันได้กับ Postgres wire protocol 100% จึงไม่ต้องแก้โค้ดใดๆ เพิ่ม แนะนำเปิดใช้ Connection Pooling (endpoint ที่มีคำว่า <code class="font-mono bg-white px-1 rounded">-pooler</code> ต่อท้าย) เมื่อ deploy บน serverless platform (เช่น Vercel) เพื่อเลี่ยงปัญหา connection limit
            </p>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- 1.3 SQL Server -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">1.3 เชื่อมต่อ SQL Server (MSSQL)</h4>
          
          <div class="space-y-3">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">.env</span>
              <pre class="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>DATABASE_URL="sqlserver://localhost:1433;database=mydb;user=sa;password=YourPassword123;trustServerCertificate=true"</code></pre>
            </div>

            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">prisma/schema.prisma</span>
              <pre class="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>datasource db {
  provider = "sqlserver"
  url      = env("DATABASE_URL")
}</code></pre>
            </div>

            <p class="text-xs text-slate-600">
              Prisma กับ SQL Server ต้องเปิด multi-statement migrations ด้วย <code class="bg-slate-100 px-1.5 py-0.5 rounded font-mono">npx prisma db execute</code> หรือรัน <code class="bg-slate-100 px-1.5 py-0.5 rounded font-mono">npx prisma migrate dev</code> ตามปกติ — schema model เขียนเหมือนกันทุก provider
            </p>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- 1.4 Express Usage -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">1.4 ใช้งานจริงใน Express</h4>
          
          <div class="space-y-4">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">prisma.js</span>
              <pre class="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma;</code></pre>
            </div>

            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">index.js</span>
              <pre class="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>require('dotenv').config();
const express = require('express');
const prisma = require('./prisma');

const app = express();
app.use(express.json());

app.get('/health', async (req, res) => {
  const result = await prisma.$queryRaw\`SELECT 1 as ok\`;
  res.json({ db: 'connected', result });
});

app.listen(3000, () => console.log('Server running on port 3000'));</code></pre>
            </div>

            <div class="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-xs text-amber-950 font-medium">
              💡 สลับฐานข้อมูลได้แค่เปลี่ยน DATABASE_URL + provider ใน schema.prisma แล้วรัน <code class="font-mono font-bold">npx prisma generate</code> ใหม่ โค้ดที่เหลือไม่ต้องแตะ
            </div>
          </div>
        </div>
      </div>
    `,
    },
  });

  // ===========================================================================
  // LESSON 2: Authentication & RBAC
  // ===========================================================================
  await prisma.lesson.create({
    data: {
      moduleId: nodeModule.id,
      title: "บทที่ 2: Authentication (Register / Login) และ Role-based Access",
      slug: "node-authentication-rbac",
      order: 2,
      published: true,
      summary:
        "เรียนรู้การทำระบบ Register, Login, การแฮชรหัสผ่านด้วย bcrypt, สร้าง JWT Token และการใช้ Role-based Access Control Middleware",
      content: `
      <div class="space-y-6 font-sans text-slate-800 leading-relaxed">
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">บทที่ 2: Authentication (Register / Login) และ Role-based Access</h3>
          
          <div class="p-3 bg-slate-900 text-emerald-400 rounded-xl text-xs font-mono mb-4">
            npm install bcrypt jsonwebtoken
          </div>
          <p class="text-xs text-slate-600">เพิ่ม field <code class="bg-rose-50 text-rose-800 px-1 rounded font-bold">role</code> ใน model User (ทำไว้แล้วในบทที่ 1 ค่า default เป็น "user")</p>
        </div>

        <hr class="border-rose-100" />

        <!-- 2.1 Principles -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-3">2.1 หลักการทำงาน</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-4">
            <div class="p-3.5 border border-slate-200 rounded-2xl bg-white shadow-sm space-y-1">
              <h6 class="font-bold text-rose-900">1. Register:</h6>
              <p className="text-slate-600">รับ email/password → hash password ด้วย bcrypt (ไม่เก็บ plain text เด็ดขาด) → บันทึกลง DB</p>
            </div>

            <div class="p-3.5 border border-slate-200 rounded-2xl bg-white shadow-sm space-y-1">
              <h6 class="font-bold text-rose-900">2. Login:</h6>
              <p className="text-slate-600">รับ email/password → ดึง user จาก DB ด้วย email → <code class="font-mono font-bold">bcrypt.compare()</code> เทียบ password กับ hash ใน DB → ออก JWT ยืนยันตัวตน</p>
            </div>

            <div class="p-3.5 border border-slate-200 rounded-2xl bg-white shadow-sm space-y-1">
              <h6 class="font-bold text-rose-900">3. Protected route:</h6>
              <p className="text-slate-600">middleware เช็ค header <code class="font-mono font-bold">Authorization: Bearer &lt;token&gt;</code> → <code class="font-mono font-bold">jwt.verify()</code> ถอดรหัส แนบ <code class="font-mono">req.user</code> ให้ route ถัดไปใช้</p>
            </div>

            <div class="p-3.5 border border-slate-200 rounded-2xl bg-white shadow-sm space-y-1">
              <h6 class="font-bold text-rose-900">4. Role check:</h6>
              <p className="text-slate-600">middleware อีกชั้นเทียบ <code class="font-mono">req.user.role</code> กับ role ที่อนุญาต หากไม่ตรงกันตอบ 403 Forbidden</p>
            </div>
          </div>

          <div class="p-3 bg-rose-50/60 border border-rose-100 rounded-xl text-xs text-rose-950">
            💡 <strong>ทำไมต้องทำแบบนี้:</strong> server ไม่เก็บ session ใดๆ (stateless) — JWT เก็บข้อมูลไว้ในตัว token เอง (signed ด้วย secret key) client เก็บ token ไว้แล้วส่งมาทุก request เหมาะกับการ scale แบบ horizontal
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- 2.2 auth.js -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">2.2 auth.js — Register / Login</h4>
          
          <div>
            <span class="text-xs font-bold text-slate-500 uppercase">auth.js</span>
            <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('./prisma');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// POST /auth/register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ message: 'Email already used' });

  const hashed = await bcrypt.hash(password, 10); // 10 = salt rounds
  const user = await prisma.user.create({
    data: { email, password: hashed, role: 'user' },
  });
  res.status(201).json({ id: user.id, email: user.email });
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
  res.json({ token });
});

module.exports = router;</code></pre>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- 2.3 Middleware -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">2.3 Middleware ตรวจสอบ token และ role</h4>
          
          <div>
            <span class="text-xs font-bold text-slate-500 uppercase">middleware/auth.js</span>
            <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { userId, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    next();
  };
}

module.exports = { authenticate, authorize };</code></pre>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- 2.4 Application -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">2.4 นำไปใช้กับ route</h4>
          
          <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>const { authenticate, authorize } = require('./middleware/auth');

// user ที่ login แล้วเข้าได้
app.get('/profile', authenticate, (req, res) => {
  res.json({ userId: req.user.userId, role: req.user.role });
});

// เฉพาะ admin เท่านั้น
app.get('/admin/users', authenticate, authorize('admin'), async (req, res) => {
  const users = await prisma.user.findMany({ select: { id: true, email: true, role: true } });
  res.json(users);
});</code></pre>

          <p class="mt-3 text-xs text-red-700 bg-red-50 p-2.5 rounded-xl border border-red-200">
            ⚠️ <strong>ข้อควรระวัง:</strong> อย่าลืมเก็บ <code class="font-mono font-bold">JWT_SECRET</code> ไว้ใน <code class="font-mono font-bold">.env</code> เสมอ ห้าม hardcode ในโค้ด และควรให้เป็นค่าสุ่มที่ยาวเพียงพอ
          </p>
        </div>
      </div>
    `,
    },
  });

  // ===========================================================================
  // LESSON 3: REST API CRUD
  // ===========================================================================
  await prisma.lesson.create({
    data: {
      moduleId: nodeModule.id,
      title: "บทที่ 3: สร้าง REST API (GET, POST, PUT, DELETE)",
      slug: "node-rest-api-crud",
      order: 3,
      published: true,
      summary:
        "เรียนรู้การทำ CRUD Operations ครบทั้ง GET, POST, PUT, DELETE สำหรับ Resource Product พร้อมการคุ้มครองสิทธิ์สิทธิ์ด้วย Middleware",
      content: `
      <div class="space-y-6 font-sans text-slate-800 leading-relaxed">
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">บทที่ 3: สร้าง REST API (GET, POST, PUT, DELETE)</h3>
          <p class="text-xs text-slate-700 mb-3">
            ตัวอย่าง CRUD สำหรับ resource Product — เพิ่ม model ใน <code class="bg-rose-50 text-rose-800 px-1 rounded font-bold">schema.prisma</code>:
          </p>

          <pre class="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto mb-2"><code>model Product {
  id        Int      @id @default(autoincrement())
  name      String
  price     Float
  stock     Int      @default(0)
  createdAt DateTime @default(now())
}</code></pre>
          <pre class="p-3 bg-slate-900 text-emerald-400 rounded-xl text-xs font-mono"><code>npx prisma migrate dev --name add_product</code></pre>
        </div>

        <hr class="border-rose-100" />

        <!-- Product Routes -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">routes/products.js</h4>
          
          <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>const express = require('express');
const prisma = require('../prisma');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /products — ดูทั้งหมด (public)
router.get('/', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// GET /products/:id — ดูรายตัว
router.get('/:id', async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

// POST /products — เฉพาะ user ที่ login แล้ว (ทุก role สร้างได้)
router.post('/', authenticate, async (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || price == null) {
    return res.status(400).json({ message: 'name and price are required' });
  }
  const product = await prisma.product.create({
    data: { name, price, stock: stock ?? 0 },
  });
  res.status(201).json(product);
});

// PUT /products/:id — เฉพาะ admin
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  const { name, price, stock } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: { name, price, stock },
    });
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: 'Not found' });
  }
});

// DELETE /products/:id — เฉพาะ admin
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = router;</code></pre>
        </div>

        <hr class="border-rose-100" />

        <!-- Main index.js -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">index.js (รวม route ทั้งหมด)</h4>
          
          <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto mb-4"><code>const authRoutes = require('./auth');
const productRoutes = require('./routes/products');

app.use('/auth', authRoutes);
app.use('/products', productRoutes);</code></pre>
        </div>

        <hr class="border-rose-100" />

        <!-- Testing with curl -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">ทดสอบด้วย cURL</h4>
          
          <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto space-y-2 mb-4"><code><span class="text-emerald-400"># Register</span>
curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" \
  -d '{"email":"a@a.com","password":"123456"}'

<span class="text-emerald-400"># Login → ได้ token</span>
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" \
  -d '{"email":"a@a.com","password":"123456"}'

<span class="text-emerald-400"># POST product (ต้องแนบ token)</span>
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" \
  -H "Authorization: Bearer &lt;token&gt;" -d '{"name":"Mouse","price":299}'</code></pre>
        </div>

        <hr class="border-rose-100" />

        <!-- API Permissions Summary Table -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-3">ตารางสรุปสิทธิ์การเข้าถึง API</h4>
          
          <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-slate-200 text-sm">
              <thead>
                <tr class="bg-rose-50 text-rose-950 font-bold">
                  <th class="border border-slate-200 p-2.5 text-left w-1/4">Method</th>
                  <th class="border border-slate-200 p-2.5 text-left w-1/2">Endpoint</th>
                  <th class="border border-slate-200 p-2.5 text-left w-1/4">สิทธิ์การเข้าถึง</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-xs font-mono">
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-2.5 font-bold text-blue-700">GET</td>
                  <td class="border border-slate-200 p-2.5">/products</td>
                  <td class="border border-slate-200 p-2.5 text-emerald-700 font-sans font-bold">ทุกคน (Public)</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-2.5 font-bold text-blue-700">GET</td>
                  <td class="border border-slate-200 p-2.5">/products/:id</td>
                  <td class="border border-slate-200 p-2.5 text-emerald-700 font-sans font-bold">ทุกคน (Public)</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-2.5 font-bold text-emerald-700">POST</td>
                  <td class="border border-slate-200 p-2.5">/products</td>
                  <td class="border border-slate-200 p-2.5 text-rose-800 font-sans font-bold">Login แล้ว (ทุก Role)</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-2.5 font-bold text-amber-700">PUT</td>
                  <td class="border border-slate-200 p-2.5">/products/:id</td>
                  <td class="border border-slate-200 p-2.5 text-red-700 font-sans font-bold">Admin เท่านั้น</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-2.5 font-bold text-red-700">DELETE</td>
                  <td class="border border-slate-200 p-2.5">/products/:id</td>
                  <td class="border border-slate-200 p-2.5 text-red-700 font-sans font-bold">Admin เท่านั้น</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,
    },
  });

  // นำโค้ดส่วนนี้ไปใส่ใน seed.ts สำหรับหลักสูตร Nest.js Backend

  const nestCourse = await prisma.course.create({
    data: {
      title: "Nest.js Backend Framework Masterclass",
      slug: "nestjs-backend-framework",
      description:
        "คู่มือสอน Nest.js ครอบคลุมการเชื่อมต่อฐานข้อมูล TypeORM ระบบ Authentication พร้อม Role-based Access Control และการสร้าง REST API แบบ CRUD",
      category: "Backend",
      level: "INTERMEDIATE",
      published: true,
    },
  });

  const nestModule = await prisma.module.create({
    data: {
      courseId: nestCourse.id,
      title: "Nest.js Architecture & Implementation",
      description:
        "เรียนรู้สถาปัตยกรรม Nest.js ตั้งแต่ Database Integration, Auth Guard/Decorator ไปจนถึง Enterprise CRUD REST API",
      order: 1,
    },
  });

  // ===========================================================================
  // LESSON 1: Database Connection with TypeORM
  // ===========================================================================
  await prisma.lesson.create({
    data: {
      moduleId: nestModule.id,
      title:
        "บทที่ 1: การเชื่อมต่อกับฐานข้อมูล (TypeORM: PostgreSQL, Neon, SQL Server)",
      slug: "nest-database-connection",
      order: 1,
      published: true,
      summary:
        "เรียนรู้การใช้ TypeORM เชื่อมต่อฐานข้อมูล 3 รูปแบบร่วมกับ @nestjs/config และ TypeOrmModule ใน Nest.js",
      content: `
      <div class="space-y-6 font-sans text-slate-800 leading-relaxed">
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">บทที่ 1: การเชื่อมต่อกับฐานข้อมูล</h3>
          <p class="text-sm text-slate-700">
            ใช้ <strong>TypeORM</strong> ซึ่งเป็น ORM มาตรฐานของ Nest.js ผ่านแพ็กเกจ <code class="bg-rose-50 text-rose-800 px-1.5 py-0.5 rounded font-mono font-bold">@nestjs/typeorm</code>
          </p>
          
          <div class="mt-3 p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs leading-relaxed overflow-x-auto">
            <p class="text-emerald-400"># ติดตั้ง Nest CLI และ Dependencies</p>
            <p>npm i -g @nestjs/cli</p>
            <p>nest new my-app</p>
            <p>cd my-app</p>
            <p>npm install @nestjs/typeorm typeorm pg mssql @nestjs/config</p>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- 1.1 PostgreSQL -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">1.1 เชื่อมต่อ PostgreSQL</h4>
          <p class="text-xs text-slate-600 mb-2">กำหนดสภาพแวดล้อมผ่านไฟล์ <code class="bg-rose-50 text-rose-800 px-1.5 py-0.5 rounded font-bold">.env</code>, <code class="bg-rose-50 text-rose-800 px-1.5 py-0.5 rounded font-bold">AppModule</code> และสร้าง <code class="bg-rose-50 text-rose-800 px-1.5 py-0.5 rounded font-bold">User Entity</code>:</p>

          <div class="space-y-3">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">.env</span>
              <pre class="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=mydb</code></pre>
            </div>

            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">src/app.module.ts</span>
              <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [User],
        synchronize: true, // dev เท่านั้น ห้ามใช้ใน production
      }),
    }),
  ],
})
export class AppModule {}</code></pre>
            </div>

            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">src/users/user.entity.ts</span>
              <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;
}</code></pre>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- 1.2 Neon Postgres -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">1.2 เชื่อมต่อ Neon Postgres</h4>
          <p class="text-xs text-slate-700 mb-3">
            เหมือน PostgreSQL ทุกอย่าง เพียงเปลี่ยนค่า connection เป็น connection string จาก Neon และเปิด <code class="bg-rose-50 text-rose-800 px-1.5 py-0.5 rounded font-mono font-bold">ssl</code>:
          </p>

          <div class="space-y-3">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">.env</span>
              <pre class="p-2.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto"><code>DATABASE_URL="postgresql://&lt;user&gt;:&lt;password&gt;@&lt;endpoint&gt;.neon.tech/&lt;dbname&gt;?sslmode=require"</code></pre>
            </div>

            <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    url: config.get('DATABASE_URL'),
    ssl: { rejectUnauthorized: false },
    entities: [User],
    synchronize: true,
  }),
})</code></pre>
            
            <p class="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              💡 <strong>คำแนะนำ:</strong> ใช้ endpoint ที่มี <code class="font-mono bg-white px-1 rounded font-bold">-pooler</code> เมื่อ deploy จริง เพื่อรองรับ serverless connection จำนวนมาก
            </p>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- 1.3 SQL Server -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">1.3 เชื่อมต่อ SQL Server (MSSQL)</h4>
          
          <div class="space-y-3">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">.env</span>
              <pre class="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=sa
DB_PASSWORD=YourPassword123
DB_DATABASE=mydb</code></pre>
            </div>

            <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'mssql',
    host: config.get('DB_HOST'),
    port: +config.get('DB_PORT'),
    username: config.get('DB_USERNAME'),
    password: config.get('DB_PASSWORD'),
    database: config.get('DB_DATABASE'),
    options: { encrypt: false, trustServerCertificate: true },
    entities: [User],
    synchronize: true,
  }),
})</code></pre>

            <div class="p-3 bg-rose-50/60 border border-rose-100 rounded-xl text-xs text-rose-950 font-medium">
              📌 <strong>สังเกต:</strong> Entity (<code class="font-mono font-bold">User</code>) เขียนครั้งเดียว ใช้ได้กับทั้ง 3 Database — สลับแค่ค่า <code class="font-mono font-bold">type</code> และ connection option ใน <code class="font-mono font-bold">TypeOrmModule.forRootAsync</code>
            </div>
          </div>
        </div>
      </div>
    `,
    },
  });

  // ===========================================================================
  // LESSON 2: Authentication & Role-based Access Control
  // ===========================================================================
  await prisma.lesson.create({
    data: {
      moduleId: nestModule.id,
      title:
        "บทที่ 2: Authentication (Register / Login) และ Role-based Access Control",
      slug: "nest-authentication-rbac",
      order: 2,
      published: true,
      summary:
        "เรียนรู้การสร้างระบบ Auth ด้วย Passport, JWT, Guards, Custom Decorators และ Metadata Reflection ตามสถาปัตยกรรม Nest.js",
      content: `
      <div class="space-y-6 font-sans text-slate-800 leading-relaxed">
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">บทที่ 2: Authentication (Register / Login) และ Role-based Access</h3>
          
          <div class="p-3 bg-slate-900 text-emerald-400 rounded-xl text-xs font-mono space-y-1 mb-4 overflow-x-auto">
            <p>npm install @nestjs/passport passport passport-jwt @nestjs/jwt bcrypt class-validator class-transformer</p>
            <p>npm install -D @types/passport-jwt @types/bcrypt</p>
            <p class="text-slate-400"># สร้าง Modules, Services, Controllers ด้วย CLI</p>
            <p>nest g module auth</p>
            <p>nest g module users</p>
            <p>nest g service users</p>
            <p>nest g controller auth</p>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- 2.1 Principles -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-3">2.1 หลักการทำงานในสไตล์ Nest.js</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-4">
            <div class="p-3.5 border border-slate-200 rounded-2xl bg-white shadow-sm space-y-1">
              <h6 class="font-bold text-rose-900">1. Register:</h6>
              <p class="text-slate-600"><code class="font-mono">AuthController</code> รับ DTO → <code class="font-mono">UsersService</code> hash password ด้วย bcrypt → บันทึกลง DB ด้วย TypeORM Repository</p>
            </div>

            <div class="p-3.5 border border-slate-200 rounded-2xl bg-white shadow-sm space-y-1">
              <h6 class="font-bold text-rose-900">2. Login:</h6>
              <p class="text-slate-600"><code class="font-mono">AuthService.validateUser()</code> เทียบ password ด้วย <code class="font-mono">bcrypt.compare()</code> → ออก JWT ผ่าน <code class="font-mono">@nestjs/jwt</code></p>
            </div>

            <div class="p-3.5 border border-slate-200 rounded-2xl bg-white shadow-sm space-y-1">
              <h6 class="font-bold text-rose-900">3. Protected Route:</h6>
              <p class="text-slate-600"><code class="font-mono">JwtStrategy</code> (Passport) ถอด token จาก header อัตโนมัติ → verify → แนบ payload เข้า <code class="font-mono">req.user</code> ผ่าน <code class="font-mono">@UseGuards(AuthGuard('jwt'))</code></p>
            </div>

            <div class="p-3.5 border border-slate-200 rounded-2xl bg-white shadow-sm space-y-1">
              <h6 class="font-bold text-rose-900">4. Role Check:</h6>
              <p class="text-slate-600"><code class="font-mono">RolesGuard</code> อ่าน metadata จาก <code class="font-mono">@Roles('admin')</code> decorator เทียบกับ <code class="font-mono">req.user.role</code> โดยใช้ Guard + Decorator + Reflector</p>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- 2.2 DTO & UsersService -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">2.2 DTO และ UsersService</h4>
          
          <div class="space-y-3">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">src/auth/dto/register.dto.ts</span>
              <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>import { IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}</code></pre>
            </div>

            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">src/users/users.service.ts</span>
              <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository&lt;User&gt;) {}

  findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async create(email: string, password: string) {
    const existing = await this.findByEmail(email);
    if (existing) throw new ConflictException('Email already used');
    const hashed = await bcrypt.hash(password, 10);
    const user = this.repo.create({ email, password: hashed, role: 'user' });
    return this.repo.save(user);
  }
}</code></pre>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- 2.3 AuthService & JwtStrategy -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">2.3 AuthService + JwtStrategy</h4>
          
          <div class="space-y-3">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">src/auth/auth.service.ts</span>
              <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  login(user: { id: number; role: string }) {
    const payload = { sub: user.id, role: user.role };
    return { access_token: this.jwt.sign(payload) };
  }
}</code></pre>
            </div>

            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">src/auth/jwt.strategy.ts</span>
              <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: number; role: string }) {
    return { userId: payload.sub, role: payload.role }; // -&gt; req.user
  }
}</code></pre>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- 2.4 RolesGuard & Decorator -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">2.4 RolesGuard + @Roles Decorator</h4>
          
          <div class="space-y-3">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">src/auth/roles.decorator.ts</span>
              <pre class="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);</code></pre>
            </div>

            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">src/auth/roles.guard.ts</span>
              <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const roles = this.reflector.get&lt;string[]&gt;('roles', ctx.getHandler());
    if (!roles) return true; // route ไม่ได้จำกัด role -&gt; ผ่าน
    const { user } = ctx.switchToHttp().getRequest();
    if (!roles.includes(user.role)) throw new ForbiddenException('Insufficient role');
    return true;
  }
}</code></pre>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- 2.5 AuthController -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">2.5 AuthController และการนำไปใช้</h4>
          
          <div>
            <span class="text-xs font-bold text-slate-500 uppercase">src/auth/auth.controller.ts</span>
            <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService, private users: UsersService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.users.create(dto.email, dto.password);
  }

  @Post('login')
  async login(@Body() dto: RegisterDto) {
    const user = await this.auth.validateUser(dto.email, dto.password);
    return this.auth.login(user);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  profile(@Request() req) {
    return req.user;
  }

  @Get('admin-only')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  adminOnly() {
    return { message: 'welcome admin' };
  }
}</code></pre>
          </div>

          <p class="mt-3 text-xs text-slate-600 bg-rose-50 p-3 rounded-xl border border-rose-100">
            📌 <strong>หมายเหตุ:</strong> <code class="font-mono font-bold">AuthModule</code> ต้องทำการ <code class="font-mono">import JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '1d' } })</code> และลงทะเบียน <code class="font-mono">JwtStrategy</code>, <code class="font-mono">AuthService</code>, <code class="font-mono">RolesGuard</code> เป็น providers ให้เรียบร้อย
          </p>
        </div>
      </div>
    `,
    },
  });

  // ===========================================================================
  // LESSON 3: REST API CRUD with Nest.js Architecture
  // ===========================================================================
  await prisma.lesson.create({
    data: {
      moduleId: nestModule.id,
      title: "บทที่ 3: สร้าง REST API (GET, POST, PUT, DELETE)",
      slug: "nest-rest-api-crud",
      order: 3,
      published: true,
      summary:
        "เรียนรู้โครงสร้าง Controller -> Service -> Repository พร้อม DTO validation และ Guards ในการจัดการ REST Resource Product",
      content: `
      <div class="space-y-6 font-sans text-slate-800 leading-relaxed">
        <div>
          <h3 class="text-xl font-bold text-rose-900 mb-2">บทที่ 3: สร้าง REST API (GET, POST, PUT, DELETE)</h3>
          <p class="text-xs text-slate-700 mb-3">
            ตัวอย่าง CRUD สำหรับ resource Product ด้วยรูปแบบ <strong>Controller → Service → Repository</strong> ซึ่งเป็นโครงสร้างมาตรฐานของ Nest.js
          </p>

          <pre class="p-3 bg-slate-900 text-emerald-400 rounded-xl text-xs font-mono overflow-x-auto mb-3"><code>nest g resource products
# เลือก REST API -&gt; Nest จะสร้าง controller/service/module/dto ให้อัตโนมัติ</code></pre>
        </div>

        <hr class="border-rose-100" />

        <!-- Entity & DTOs -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">3.1 Entity และ DTOs</h4>
          
          <div class="space-y-3">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">src/products/product.entity.ts</span>
              <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @Column({ default: 0 })
  stock: number;

  @CreateDateColumn()
  createdAt: Date;
}</code></pre>
            </div>

            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">src/products/dto/create-product.dto.ts</span>
              <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  stock?: number;
}</code></pre>
            </div>

            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">src/products/dto/update-product.dto.ts</span>
              <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}</code></pre>
            </div>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- Service & Controller -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">3.2 Service, Controller และ Module</h4>
          
          <div class="space-y-3">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">src/products/products.service.ts</span>
              <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository&lt;Product&gt;) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const product = await this.repo.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  create(dto: CreateProductDto) {
    const product = this.repo.create(dto);
    return this.repo.save(product);
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    return this.repo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.repo.remove(product);
  }
}</code></pre>
            </div>

            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">src/products/products.controller.ts</span>
              <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  findAll() {
    return this.service.findAll(); // public
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id); // public
  }

  @Post()
  @UseGuards(AuthGuard('jwt')) // เฉพาะ user ที่ login แล้ว
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard) // เฉพาะ admin
  @Roles('admin')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard) // เฉพาะ admin
  @Roles('admin')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}</code></pre>
            </div>

            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">src/products/products.module.ts</span>
              <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto"><code>import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}</code></pre>
            </div>

            <p class="text-xs text-slate-600 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              💡 อย่าลืม import <code class="font-mono font-bold">ProductsModule</code> เข้า <code class="font-mono font-bold">AppModule</code> และเพิ่ม <code class="font-mono font-bold">Product</code> เข้า <code class="font-mono">entities</code> ของ <code class="font-mono">TypeOrmModule.forRootAsync</code>
            </p>
          </div>
        </div>

        <hr class="border-rose-100" />

        <!-- Testing & Summary -->
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">ทดสอบด้วย cURL</h4>
          <pre class="p-3.5 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto mb-4"><code>curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" -H "Authorization: Bearer &lt;token&gt;" \
  -d '{"name":"Mouse","price":299}'</code></pre>

          <h4 class="text-lg font-bold text-slate-900 mb-3">ตารางสรุปสิทธิ์การเข้าถึง API</h4>
          <div class="overflow-x-auto mb-4">
            <table class="w-full border-collapse border border-slate-200 text-sm">
              <thead>
                <tr class="bg-rose-50 text-rose-950 font-bold">
                  <th class="border border-slate-200 p-2.5 text-left w-1/4">Method</th>
                  <th class="border border-slate-200 p-2.5 text-left w-1/2">Endpoint</th>
                  <th class="border border-slate-200 p-2.5 text-left w-1/4">สิทธิ์การเข้าถึง</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-xs font-mono">
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-2.5 font-bold text-blue-700">GET</td>
                  <td class="border border-slate-200 p-2.5">/products</td>
                  <td class="border border-slate-200 p-2.5 text-emerald-700 font-sans font-bold">ทุกคน (Public)</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-2.5 font-bold text-blue-700">GET</td>
                  <td class="border border-slate-200 p-2.5">/products/:id</td>
                  <td class="border border-slate-200 p-2.5 text-emerald-700 font-sans font-bold">ทุกคน (Public)</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-2.5 font-bold text-emerald-700">POST</td>
                  <td class="border border-slate-200 p-2.5">/products</td>
                  <td class="border border-slate-200 p-2.5 text-rose-800 font-sans font-bold">Login แล้ว (ทุก Role)</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-2.5 font-bold text-amber-700">PUT</td>
                  <td class="border border-slate-200 p-2.5">/products/:id</td>
                  <td class="border border-slate-200 p-2.5 text-red-700 font-sans font-bold">Admin เท่านั้น</td>
                </tr>
                <tr class="hover:bg-slate-50">
                  <td class="border border-slate-200 p-2.5 font-bold text-red-700">DELETE</td>
                  <td class="border border-slate-200 p-2.5">/products/:id</td>
                  <td class="border border-slate-200 p-2.5 text-red-700 font-sans font-bold">Admin เท่านั้น</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
            <h5 class="font-bold text-slate-900 text-sm mb-1">🔑 ข้อแตกต่างสำคัญจาก Node.js/Express ปกติ:</h5>
            <p>• Nest.js แยกหน้าที่เป็น Controller (รับ request), Service (business logic) และ Module (รวมกลุ่ม) อย่างชัดเจน</p>
            <p>• ใช้ Dependency Injection แทนการ require / import โดยตรง</p>
            <p>• ใช้ Decorators (<code class="font-mono font-bold">@Get</code>, <code class="font-mono font-bold">@Post</code>) แทนการเรียก <code class="font-mono">router.get()</code> ตรงๆ</p>
          </div>
        </div>
      </div>
    `,
    },
  });
}

main()
  .catch((e) => {
    console.error("❌ Seed Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
