import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  UploadCloud,
  FileCheck2,
  Trash2,
  Download,
  Eye,
  AlertCircle,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { useHealthData } from '@/context/HealthDataContext';
import { ReportMetadata } from '@/types/database';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { validateReportFile, ALLOWED_FILE_TYPES } from '@/utils/validation';
import { formatDate } from '@/utils/date';

export const MedicalReportsPage: React.FC = () => {
  const { reports, uploadReport, deleteReport, reportsLoading } = useHealthData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Deletion modal
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Preview modal
  const [previewReport, setPreviewReport] = useState<ReportMetadata | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const validation = validateReportFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Invalid file');
      return;
    }
    setSelectedFile(file);
  };

  const handleStartUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(10);
    setErrorMessage(null);

    try {
      const res = await uploadReport(selectedFile, (percent) => {
        setUploadProgress(percent);
      });

      if (res.success) {
        setSuccessMessage(`Successfully uploaded ${selectedFile.name} to private cloud vault!`);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setErrorMessage(res.error || 'Failed to upload report');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error occurred during report upload');
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    await deleteReport(deleteConfirmId);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-8">
      {/* Disclaimer Header Card */}
      <div className="bg-amber-500/10 border border-amber-500/25 p-5 rounded-3xl text-amber-900 text-xs sm:text-sm flex flex-col sm:flex-row items-start gap-4">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-900">
            Private Storage Policy & Clinical Disclaimer
          </p>
          <p className="text-amber-800/90 leading-relaxed text-xs">
            Aarogya360 acts purely as your private document repository. We do <strong>NOT</strong> perform automatic artificial intelligence diagnostics or medical evaluations on uploaded files. Always present reports directly to your certified doctor.
          </p>
        </div>
      </div>

      {/* Upload Box */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative rounded-3xl p-8 sm:p-10 border-2 border-dashed transition-all text-center ${
          dragActive
            ? 'border-emerald-500 bg-emerald-50/50'
            : selectedFile
            ? 'border-teal-800 bg-white'
            : 'border-teal-800/20 bg-white/70 hover:border-emerald-500/50 hover:bg-white'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          onChange={handleFileChange}
          className="hidden"
          id="report-file-input"
        />

        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-800 mx-auto flex items-center justify-center shadow-sm">
            <UploadCloud className="w-8 h-8 text-emerald-600" />
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-navy-800">
              {selectedFile ? selectedFile.name : 'Drag & Drop Medical Report Here'}
            </h3>
            <p className="text-xs text-navy-600/70 mt-1">
              Supports PDF, PNG, JPG, or WebP up to 10 MB per file.
            </p>
          </div>

          {/* Progress bar */}
          {isUploading && (
            <div className="w-full space-y-2 py-2">
              <div className="flex justify-between text-xs font-semibold text-teal-800">
                <span>Encrypting and uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 w-full bg-canvas rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
            </div>
          )}

          {/* Feedback messages */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 text-rose-700 rounded-xl text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2 text-left">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            {!selectedFile ? (
              <label htmlFor="report-file-input" className="cursor-pointer">
                <Button variant="primary" size="md" type="button" onClick={() => fileInputRef.current?.click()}>
                  Browse Files
                </Button>
              </label>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  disabled={isUploading}
                >
                  Change File
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleStartUpload}
                  isLoading={isUploading}
                  leftIcon={<ShieldCheck className="w-4 h-4" />}
                >
                  Upload Securely
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Reports Vault List */}
      <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-teal-800/10 shadow-card space-y-6">
        <div className="flex items-center justify-between border-b border-teal-800/10 pb-4">
          <div className="flex items-center gap-2.5">
            <FileCheck2 className="w-5 h-5 text-teal-800" />
            <h2 className="text-lg font-bold text-navy-800">
              Archived Reports ({reports.length})
            </h2>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-800/10">
            Row Level Security Active
          </span>
        </div>

        {reportsLoading ? (
          <div className="py-12 text-center text-xs text-navy-600">
            Loading archived reports...
          </div>
        ) : reports.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <FileText className="w-10 h-10 text-navy-400 mx-auto" />
            <h3 className="text-sm font-bold text-navy-700">No Reports in Vault</h3>
            <p className="text-xs text-navy-500 max-w-sm mx-auto">
              Upload blood work results, pathology panels, prescription scans, or clinic discharge summaries.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="p-5 rounded-2xl bg-canvas border border-teal-800/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 truncate">
                    <div className="p-3 rounded-xl bg-teal-800 text-mint-100 shrink-0">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <h4 className="text-sm font-bold text-navy-800 truncate" title={report.file_name}>
                        {report.file_name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-navy-500 mt-0.5">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        <span>{formatDate(report.created_at)}</span>
                        <span>•</span>
                        <span>{Math.round(report.file_size_bytes / 1024)} KB</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-teal-800/10">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setPreviewReport(report)}
                    leftIcon={<Eye className="w-3.5 h-3.5" />}
                  >
                    View Details
                  </Button>
                  <button
                    onClick={() => setDeleteConfirmId(report.id)}
                    className="p-2 text-navy-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Delete report"
                    aria-label={`Delete ${report.file_name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Details Modal */}
      <Modal
        isOpen={Boolean(previewReport)}
        onClose={() => setPreviewReport(null)}
        title="Report Metadata & File Access"
        description="Encrypted file metadata retrieved from storage."
        maxWidth="md"
      >
        {previewReport && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-canvas border border-teal-800/10 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-teal-800/10">
                <span className="text-navy-600">File Name:</span>
                <span className="font-bold text-navy-900 truncate max-w-[200px]">{previewReport.file_name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-teal-800/10">
                <span className="text-navy-600">MIME Type:</span>
                <span className="font-semibold text-navy-800">{previewReport.file_type}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-teal-800/10">
                <span className="text-navy-600">Storage Size:</span>
                <span className="font-semibold text-navy-800">{Math.round(previewReport.file_size_bytes / 1024)} KB</span>
              </div>
              <div className="flex justify-between py-1 border-b border-teal-800/10">
                <span className="text-navy-600">Uploaded On:</span>
                <span className="font-semibold text-navy-800">{formatDate(previewReport.created_at)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-navy-600">Vault Path:</span>
                <span className="font-mono text-[10px] text-teal-800 truncate max-w-[200px]">{previewReport.file_path}</span>
              </div>
            </div>

            {previewReport.preview_url && previewReport.file_type.startsWith('image/') && (
              <div className="rounded-2xl overflow-hidden border border-teal-800/10 max-h-60 flex items-center justify-center bg-black/5">
                <img src={previewReport.preview_url} alt="Report preview" className="object-contain max-h-60" />
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setPreviewReport(null)}>
                Close
              </Button>
              {previewReport.preview_url ? (
                <a href={previewReport.preview_url} download={previewReport.file_name} target="_blank" rel="noreferrer">
                  <Button variant="primary" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
                    Download
                  </Button>
                </a>
              ) : (
                <Button variant="secondary" size="sm" onClick={() => alert('File is securely saved in private storage.')}>
                  Verify Secure Storage
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Permanently Delete Report?"
        description="This will delete both the database metadata and the underlying file from the private cloud bucket."
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div className="p-3 bg-rose-50 text-rose-800 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Are you sure you want to remove this medical document?</span>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmDelete}>
              Delete File
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
