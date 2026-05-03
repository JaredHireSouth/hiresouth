import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HireSouth backend is running' });
});

app.post('/api/messages', async (req, res) => {
  try {
    const message = await anthropic.messages.create(req.body);
    res.json(message);
  } catch (err) {
    console.error('Claude error:', err);
    res.status(err.status || 500).json({ error: err.message });
  }
});

app.post('/api/parse-resume', async (req, res) => {
  try {
    const { base64, mediaType } = req.body;
    if (!base64 || !mediaType) {
      return res.status(400).json({ error: 'Missing base64 or mediaType' });
    }

    const prompt = `Extract all candidate information from this resume and return JSON only — no markdown, no extra text.
Return ONLY this JSON (use "" for any field not found):
{"firstName":"","lastName":"","email":"","phone":"","title":"most recent job title","location":"city, state or country","seniority":"Junior or Senior or Director or VP or C-Suite","linkedin":"","skills":"comma separated key skills","education":"degree, institution, year","languages":"languages and levels","role1":"Most recent: Title, Company, Dates. Key achievements in 2-3 sentences.","role2":"Previous: Title, Company, Dates. Key achievements in 1-2 sentences.","availability":""}`;

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1200,
      messages: [{
        role: 'user',
        content: [
          { type: 'document', source: { type: 'base64', media_type: mediaType, data: base64 } },
          { type: 'text', text: prompt }
        ]
      }]
    });

    const raw = message.content.map(c => c.text || '').join('');
    const parsed = JSON.parse(raw.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim());
    res.json(parsed);
  } catch (err) {
    console.error('Parse error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/generate-profile', async (req, res) => {
  try {
    const { candidate } = req.body;
    if (!candidate) {
      return res.status(400).json({ error: 'Missing candidate data' });
    }

    const prompt = `You are a recruitment consultant at HireSouth. Generate a candidate profile. Respond ONLY with valid JSON, no markdown.
Name: ${candidate.firstName} ${candidate.lastName}, Title: ${candidate.title}, Location: ${candidate.location}, Seniority: ${candidate.seniority}, Availability: ${candidate.availability}, Source: ${candidate.source}
Recent Role: ${candidate.role1 || 'Not provided'}, Previous Role: ${candidate.role2 || 'Not provided'}
Skills: ${candidate.skills || 'Not provided'}, Education: ${candidate.education || 'Not provided'}, Languages: ${candidate.languages || 'Not provided'}
Recruiter Notes: ${candidate.notes || 'Not provided'}
Return: {"summary":"3-4 sentence professional third-person summary","highlights":"2-3 paragraph recruiter highlights","skills":[{"category":"Category","items":["skill"]}],"experience":[{"title":"Title","company":"Company","dates":"Dates","bullets":["achievement"]}],"education":"string","languages":"string"}`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    });

    const raw = message.content.map(c => c.text || '').join('');
    const profile = JSON.parse(raw.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim());
    res.json(profile);
  } catch (err) {
    console.error('Profile generation error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/screen-candidate', async (req, res) => {
  try {
    const { candidate, job } = req.body;
    if (!candidate || !job) {
      return res.status(400).json({ error: 'Missing candidate or job data' });
    }

    const prompt = `You are a recruitment consultant. Screen this candidate against the job description. Respond ONLY with JSON.
Candidate: ${candidate.firstName} ${candidate.lastName}, ${candidate.title}, ${candidate.location}. Skills: ${candidate.skills}. ${candidate.role1 || ''} ${candidate.role2 || ''}
Job: ${job.title} at ${job.client || job.location}. Requirements: ${job.requirements}. Description: ${job.description}
Return: {"overall":85,"skills":80,"experience":78,"culture":82,"summary":"2-3 sentence overall assessment","strengths":["strength1","strength2","strength3"],"gaps":["gap1","gap2"],"recommendation":"Recommend or Consider or Pass"}`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }]
    });

    const raw = message.content.map(c => c.text || '').join('');
    const result = JSON.parse(raw.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim());
    res.json(result);
  } catch (err) {
    console.error('Screening error:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`HireSouth backend running on port ${PORT}`);
});
